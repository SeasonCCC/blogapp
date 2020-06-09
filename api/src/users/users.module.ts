/*
 * @Author: Season
 * @Date: 2020-04-02 10:14:20
 * @LastEditTime: 2020-06-09 14:56:41
 * @FilePath: \api\src\users\users.module.ts
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { resolve } from 'path';
import { config } from 'dotenv';
import UsersService from './users.service';
import Users from './users.entity';
import News from '../news/news.entity';
import UsersResolver from './users.resolvers';
import JwtStrategy from '../shared/guard/jwt.strategy';

config({ path: resolve(__dirname, '../../.env') });

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, News]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [UsersService, UsersResolver, JwtStrategy],
})
export default class UsersModule {}
