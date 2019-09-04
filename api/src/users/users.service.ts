import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'

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

  async getAllUsers() {
    const users = await this.usersRepository
      .aggregateEntity([
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

    throw new HttpException(
      {
        data: users.map(user => user.toResponseObject(false)),
        message: 'GetAllUsers:Success',
      },
      HttpStatus.OK,
    )
  }

  async findOne(id: string) {
    const user = await this.usersRepository
      .aggregateEntity([
        {
          $lookup: {
            from: 'news',
            localField: '_id',
            foreignField: 'authorId',
            as: 'news',
          },
        },
        {
          $match: { _id: ObjectId(id) },
        },
      ])
      .toArray()

    throw new HttpException(
      {
        data: user[0].toResponseObject(false),
        message: `Find ${id} user:Success`,
      },
      HttpStatus.OK,
    )
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

    throw new HttpException(
      {
        data: user.toResponseObject(true),
        message: `Login ${username} :Success`,
      },
      HttpStatus.OK,
    )
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

    throw new HttpException(
      {
        data: userInserted.toResponseObject(true),
        message: `Register ${username} :Success`,
      },
      HttpStatus.OK,
    )
  }

  async updateType(data: UpdateTypeDto) {
    const user = await this.usersRepository.findOne(data.id)
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    user.type = data.type
    await this.usersRepository.save(user)

    throw new HttpException(
      {
        data: user,
        message: `Update ${data.id} Type:Success`,
      },
      HttpStatus.OK,
    )
  }

  async changePassword(password: string, user: Users) {
    console.log(password, user)
  }
}
