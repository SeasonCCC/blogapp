import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { News } from './news.entity'
import { NewsDTO } from './news.dto'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {
    this.newsRepository = newsRepository
  }

  async showAll() {
    const news = await this.newsRepository.find()
    return news
  }

  async create(data: NewsDTO) {
    const news = await this.newsRepository.create(data)
    await this.newsRepository.save(news)
    return news
  }

  async find(id: string) {
    const news = await this.newsRepository.findOne(id)
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return news
  }

  async update(id: string, data: NewsDTO) {
    const news = await this.newsRepository.findOne(id)
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    await this.newsRepository.update(id, data)
    return news
  }

  async delete(id: string) {
    const news = await this.newsRepository.findOne(id)
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    await this.newsRepository.delete(id)
    return news
  }
}
