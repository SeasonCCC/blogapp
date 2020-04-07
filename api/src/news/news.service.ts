import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import News from './news.entity';
import { NewsDTO, UpdateNewsDto } from './news.dto';
import { NewsRO } from './news.d';

@Injectable()
export default class NewsService {
  // constructor(
  //   @InjectRepository(News)
  //   private newsRepository: Repository<News>,
  //   @InjectRepository(Users)
  //   private usersRepository: Repository<Users>,
  // ) {
  //   this.newsRepository = newsRepository
  // }
  @InjectRepository(News)
  private newsRepository: Repository<News>

  async showAll(): Promise<NewsRO[]> {
    const news = (await this.newsRepository.find()) as NewsRO[];
    // console.log(news);
    return news;
    // return new Promise<NewsRO[]>(resolve => {
    //   resolve(news);
    // });

    // throw new HttpException(
    //   {
    //     data: news,
    //     message: 'GetAllNews:Success',
    //   },
    //   HttpStatus.OK,
    // )
  }

  async create(id: string, data: NewsDTO): Promise<NewsRO> {
    const news = this.newsRepository.create({
      ...data,
      authorId: ObjectId(id),
    });
    await this.newsRepository.save(news);
    throw new HttpException(
      {
        data: news,
        message: 'GetAllNews:Success',
      },
      HttpStatus.OK,
    );
  }

  async findOne(id: string): Promise<NewsRO> {
    const news = (await this.newsRepository.findOne(id)) as NewsRO;
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return news;
    // throw new HttpException(
    //   {
    //     data: news,
    //     message: `Find ${id} News:Success`,
    //   },
    //   HttpStatus.OK,
    // )
  }

  async update(data: UpdateNewsDto): Promise<NewsRO> {
    const { id } = data;
    const news = await this.newsRepository.findOne(id);
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    delete data.id;
    const updatedNews = { ...news, ...data };

    const res = await this.newsRepository.save(updatedNews);
    throw new HttpException(
      {
        data: res,
        message: `Update ${id} News:Success`,
      },
      HttpStatus.OK,
    );
  }

  async delete(id: string): Promise<NewsRO> {
    const news = await this.newsRepository.findOne(id);
    if (!news) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.newsRepository.delete(id);
    throw new HttpException(
      {
        data: news,
        message: `Delete ${id} News:Success`,
      },
      HttpStatus.OK,
    );
  }
}
