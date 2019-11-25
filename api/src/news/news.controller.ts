import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsDTO, UpdateNewsDto, NewsRO } from './news.dto'
import { ValidationPipe } from '../shared/validation.pipe'
import { AuthGuard } from '../shared/auth.guard'
import { User } from '../users/users.decorator'

@Controller('news')
export class NewsController {
  // private readonly newsService: NewsService
  constructor(private readonly newsService: NewsService) {
    this.newsService = newsService
  }

  @Get()
  getAllNews(): Promise<NewsRO[]> {
    console.log(process.env.TYPEORM_HOST)
    return this.newsService.showAll()
  }

  @Post('addNews')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createNew(@User('id') id: string, @Body() data: NewsDTO) {
    return this.newsService.create(id, data)
  }

  @Get(':id')
  getNewById(@Param('id') id: string) {
    return this.newsService.findOne(id)
  }

  @Post('updateNews')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateNew(@Body() data: UpdateNewsDto) {
    return this.newsService.update(data)
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  deleteNew(@Param('id') id: string) {
    return this.newsService.delete(id)
  }
}
