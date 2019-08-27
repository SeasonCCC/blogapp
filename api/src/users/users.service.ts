import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { Users } from './users.entity'
import { UsersDTO, UsersRO } from './users.dto'

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
    // console.log(await bcrypt.hash('12345678', 10))
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

  async login(data: UsersDTO): Promise<UsersRO> {
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

  async register(data: UsersDTO): Promise<UsersRO> {
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
}
