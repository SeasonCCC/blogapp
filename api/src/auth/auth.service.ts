/*
 * @Author: Season
 * @Date: 2020-05-14 15:05:59
 * @LastEditTime: 2020-05-14 15:30:42
 * @FilePath: \api\src\auth\auth.service.ts
 */
import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import UsersService from '../users/users.service';

@Injectable()
export default class AuthService {
  private usersService: UsersService

  private jwtService:JwtService
  // constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
