import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Users } from './users.entity'
import { UsersDTO, UsersDO } from './users.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async showAll(): Promise<UsersDO[]> {
    // return this.usersRepository.find();
    const users = await this.usersRepository.find()
    return users.map(user => user.toResponseObject(false))
  }

  async login(data: UsersDTO): Promise<UsersDO> {
    const { username, password } = data
    const user = await this.usersRepository.findOne({ where: { username } })
    if (!user || (await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      )
    }
    return user.toResponseObject(false)
  }

  async register(data: UsersDTO): Promise<UsersDO> {
    const { username } = data
    const user = await this.usersRepository.findOne({
      where: { username },
    })

    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    await this.usersRepository.save(data)
    const userInserted = await this.usersRepository.findOne({
      where: { username },
    })

    return userInserted.toResponseObject(false)
  }

  // async find(id: string) {
  //   const users = await this.usersRepository.findOne(id);
  //   if (!users) {
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  //   }
  //   return users;
  // }

  // async update(id: string, data: UsersDTO) {
  //   const users = await this.usersRepository.findOne(id);
  //   if (!users) {
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  //   }

  //   await this.usersRepository.update(id, data);
  //   return users;
  // }

  // async delete(id: string) {
  //   const users = await this.usersRepository.findOne(id);
  //   if (!users) {
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  //   }

  //   await this.usersRepository.delete(id);
  //   return users;
  // }
}
