import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ObjectId } from 'mongodb'
import { Repository } from 'typeorm'

import { News } from './news.entity'
import { NewsDTO, NewsRO } from './news.dto'

@Injectable()
export class NewsService {
  // constructor(
  //   @InjectRepository(News)
  //   private newsRepository: Repository<News>,
  //   @InjectRepository(Users)
  //   private usersRepository: Repository<Users>,
  // ) {
  //   this.newsRepository = newsRepository
  // }

  // private toResponseObject(news: News) {
  //   return { ...news, author: news.author.toResponseObject(false) }
  // }

  @InjectRepository(News)
  private newsRepository: Repository<News>

  async showAll(): Promise<NewsRO[]> {
    const news = await this.newsRepository.find({ relations: ['authorId'] })
    return news
  }

  async create(id: string, data: NewsDTO): Promise<NewsRO> {
    const news = await this.newsRepository.create({
      ...data,
      authorId: ObjectId(id),
    })
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
