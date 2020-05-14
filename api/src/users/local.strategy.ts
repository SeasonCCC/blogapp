/*
 * @Author: Season
 * @Date: 2020-05-14 15:13:20
 * @LastEditTime: 2020-05-14 18:09:49
 * @FilePath: \api\src\users\local.strategy.ts
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import UsersService from './users.service';
import { UsersDto } from './users.dto';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
