import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Users } from './users.entity';
import {
  UsersDto,
  UsersRO,
  UpdateTypeDto,
  ChangePassowrdDto,
} from './users.dto';

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
      .toArray();

    return users.map((user) => user.toResponseObject(false));
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
      .toArray();

    return user[0].toResponseObject(false);
  }

  async login(data: UsersDto): Promise<UsersRO> {
    const { username, password } = data;

    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.toResponseObject(true);

    // throw new HttpException(
    //   {
    //     data: user.toResponseObject(true),
    //     message: `Login ${username} :Success`,
    //   },
    //   HttpStatus.OK,
    // )
  }

  async register(data: UsersDto): Promise<UsersRO> {
    const { username } = data;
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const users = await this.usersRepository.create(data);

    await this.usersRepository.save(users);
    const userInserted = await this.usersRepository.findOne({
      where: { username },
    });

    return userInserted.toResponseObject(true);
  }

  async updateType(data: UpdateTypeDto) {
    const user = await this.usersRepository.findOne(data.id);
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    user.type = data.type;
    await this.usersRepository.save(user);

    return user;
  }

  async changePassword(data: ChangePassowrdDto, id: string) {
    const { oldPassword, newPassword } = data;
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }

    if (oldPassword === newPassword) {
      throw new HttpException(
        'New password cannot be equal to old password',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!(await user.comparePassword(oldPassword))) {
      throw new HttpException('Invalid old password', HttpStatus.BAD_REQUEST);
    }

    user.password = newPassword;
    user.hashPassword();
    await this.usersRepository.save(user);

    return user;
  }

  async resetPassword(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }

    user.password = '12345678';
    user.hashPassword();
    await this.usersRepository.save(user);

    return user.toResponseObject(false);
  }
}
