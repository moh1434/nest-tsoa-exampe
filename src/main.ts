import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'nestjs-prisma';

import { VersioningType } from '@nestjs/common';

import morgan from 'morgan';
import dotenv from 'dotenv';

import { NestExpressApplication } from '@nestjs/platform-express';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import swaggerTsoa from '../swagger.json';
import { tsoaResponseToNestDocument } from './utils/tsoaResponseToNestDocument';
async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // enable version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ZodValidationPipe());

  //start: Swagger
  const config = new DocumentBuilder()
    .addBearerAuth(undefined, 'note:httpOnly Cookie will be used automatically')
    .addSecurityRequirements('note:httpOnly Cookie will be used automatically')
    .setTitle('nest example')
    .setDescription('My nest API description')
    .setVersion('1.0')
    .build();

  let document = SwaggerModule.createDocument(app, config);
  // fs.writeFileSync('./nest-swagger.json', JSON.stringify(document));
  document = tsoaResponseToNestDocument(swaggerTsoa, document, true);

  SwaggerModule.setup('api', app, document);
  //end: Swagger

  await app.listen(3000);
}

bootstrap();
