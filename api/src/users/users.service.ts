import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { Users } from './users.entity'
import { UsersDto, UsersRO, UpdateTypeDto } from './users.dto'

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(Users)
  //   private usersRepository: MongoRepository<Users>,
  // ) {
  //   this.usersRepository = usersRepository
  // }
  @InjectRepository(Users)
  private usersRepository: MongoRepository<Users>

  async showAll() {
    // const users = await this.usersRepository.find()
    const users = await this.usersRepository
      .aggregate([
        {
          $lookup: {
            from: 'news',
            localField: '_id',
            foreignField: 'authorId',
            as: 'news',
          },
        },
      ])
      .toArray()

    return users
  }

  async login(data: UsersDto): Promise<UsersRO> {
    const { username, password } = data
    const user = await this.usersRepository.findOne({ where: { username } })

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      )
    }
    return user.toResponseObject(true)
  }

  async register(data: UsersDto): Promise<UsersRO> {
    const { username } = data
    const user = await this.usersRepository.findOne({
      where: { username },
    })

    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    const users = await this.usersRepository.create(data)

    await this.usersRepository.save(users)
    const userInserted = await this.usersRepository.findOne({
      where: { username },
    })

    return userInserted.toResponseObject(true)
  }

  async updateType(data: UpdateTypeDto) {
    const user = await this.usersRepository.findOne(data.id)
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    await this.usersRepository.update(data.id, { type: data.type })
    user.type = data.type
    return user
  }
}
