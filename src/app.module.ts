import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { PostModule } from './post/post.module';

@Global()
@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {},
      },
    }),
    PostModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
