import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
} from '@nestjs/common'
import { NewsService } from './news.service'
import { NewsDTO } from './news.dto'
import { ValidationPipe } from '../shared/validation.pipe'

@Controller('news')
export class NewsController {
  private readonly newsService: NewsService
  // constructor(private readonly newsService: NewsService) {}

  @Get()
  getAllNews() {
    return this.newsService.showAll()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createNew(@Body() data: NewsDTO) {
    return this.newsService.create(data)
  }

  @Get(':id')
  getNewById(@Param('id') id: string) {
    return this.newsService.find(id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateNew(@Param('id') id: string, @Body() data: NewsDTO) {
    return this.newsService.update(id, data)
  }

  @Delete(':id')
  deleteNew(@Param('id') id: string) {
    return this.newsService.delete(id)
  }
}
