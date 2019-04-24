import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from './news.entity';
import { NewsDTO } from './news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async showAll() {
    return await this.newsRepository.find();
  }

  async create(data: NewsDTO) {
    const newCreated = await this.newsRepository.create(data);
    await this.newsRepository.save(newCreated);
    return newCreated;
  }

  async find(id: string) {
    return await this.newsRepository.findOne(id);
  }

  async update(id: string, data: NewsDTO) {
    await this.newsRepository.update(id, data);
    return await this.newsRepository.findOne(id);
  }

  async delete(id: string) {
    const deleteNew = await this.newsRepository.findOne(id);
    await this.newsRepository.delete(id);
    return deleteNew;
  }
}
