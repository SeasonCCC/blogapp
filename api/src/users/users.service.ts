import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'

import { Users } from './users.entity'
import { UsersDTO, UsersRO } from './users.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: MongoRepository<Users>,
  ) {
    this.usersRepository = usersRepository
  }

  async showAll() {
    // const users = await this.usersRepository.find()
    const usersCursor = await this.usersRepository.aggregateEntity([
      {
        $lookup: {
          from: 'news',
          localField: '_id',
          foreignField: 'authorId',
          as: 'news',
        },
      },
    ])
    var userArr: Array<any> = []

    usersCursor.toArray((err, doc) => {
      if (!err) {
        userArr.push(doc)
        console.log(doc, err)
      }
      console.log(userArr)
    })

    return userArr
  }

  async login(data: UsersDTO): Promise<UsersRO> {
    const { username, password } = data
    const user = await this.usersRepository.findOne({ where: { username } })
    if (!user || (await user.comparePassword(password))) {
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

    await this.usersRepository.save(data)
    const userInserted = await this.usersRepository.findOne({
      where: { username },
    })

    return userInserted.toResponseObject(true)
  }
}
