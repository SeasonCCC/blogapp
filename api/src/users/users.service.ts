import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './users.entity';
import { UsersDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async showAll() {
    return await this.usersRepository.find();
  }

  async register(data: UsersDTO) {
    const users = await this.usersRepository.create(data);
    await this.usersRepository.save(users);
    return users;
  }

  async find(id: string) {
    const users = await this.usersRepository.findOne(id);
    if (!users) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async update(id: string, data: UsersDTO) {
    const users = await this.usersRepository.findOne(id);
    if (!users) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.update(id, data);
    return users;
  }

  async delete(id: string) {
    const users = await this.usersRepository.findOne(id);
    if (!users) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.delete(id);
    return users;
  }
}
