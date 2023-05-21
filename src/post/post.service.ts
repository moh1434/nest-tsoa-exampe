import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  static readonly select = {
    id: true,
    content: true,
    createdAt: true,
    isPublished: true,
    updatedAt: true,
  } satisfies Prisma.PostSelect;

  async findById(id: string) {
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { id },
      select: PostService.select,
    });
    return post;
  }

  async create(body: CreatePostDto, isPublished = false) {
    const post = await this.prisma.post.create({
      data: {
        content: body.content,
        isPublished,
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
    return post;
  }
}
