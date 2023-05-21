import { Request, Route } from 'tsoa';
import { CreatePostDto } from './dto/create-post.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiConsumes } from '@nestjs/swagger';

@Route('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/:id')
  async findById(@Request() @Param('id') id: string) {
    const post = await this.postService.findById(id);

    return post;
  }

  @Post('/')
  async createByUser(@Request() @Body() body: CreatePostDto) {
    console.log(body);
    return await this.postService.create(body);
  }
}
