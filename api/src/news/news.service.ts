import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { News } from './news.entity'
import { Users } from 'src/users/users.entity'
import { NewsDTO, NewsRO } from './news.dto'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {
    this.newsRepository = newsRepository
    this.usersRepository = usersRepository
  }

  async showAll(): Promise<NewsRO[]> {
    const news = await this.newsRepository.find()
    return news
  }

  async create(data: NewsDTO): Promise<NewsRO> {
    const news = await this.newsRepository.create(data)
    await this.newsRepository.save(news)
    return news
  }

  async findOne(id: string): Promise<NewsRO> {
    const news = await this.newsRepository.findOne(id)
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return news
  }

  async update(id: string, data: NewsDTO): Promise<NewsRO> {
    const news = await this.newsRepository.findOne(id)
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    await this.newsRepository.update(id, data)
    return news
  }

  async delete(id: string): Promise<NewsRO> {
    const news = await this.newsRepository.findOne(id)
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    await this.newsRepository.delete(id)
    return news
  }
}
