import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import NewsService from './news.service';
import { NewsDTO, UpdateNewsDto } from './news.dto';
import { NewsRO } from './news.d';
import ValidationPipe from '../shared/validation.pipe';
import AuthGuard from '../shared/auth.guard';
import { User } from '../users/users.decorator';

@Controller('news')
export default class NewsController {
  // private readonly newsService: NewsService
  constructor(private readonly newsService: NewsService) {
    this.newsService = newsService;
  }

  @Get()
  // @UseGuards(new AuthGuard())
  getAllNews(): Promise<NewsRO[]> {
    return this.newsService.showAll();
  }

  @Post('addNews')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createNew(@User('id') id: string, @Body() data: NewsDTO) {
    return this.newsService.create(id, data);
  }

  @Get(':id')
  getNewById(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Post('updateNews')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateNew(@Body() data: UpdateNewsDto) {
    return this.newsService.update(data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  deleteNew(@Param('id') id: string) {
    return this.newsService.delete(id);
  }
}
