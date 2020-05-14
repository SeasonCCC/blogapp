/*
 * @Author: Season
 * @Date: 2020-04-02 10:14:20
 * @LastEditTime: 2020-05-14 17:08:55
 * @FilePath: \api\src\users\users.module.ts
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import UsersController from './users.controller';
import UsersService from './users.service';
import Users from './users.entity';
import News from '../news/news.entity';
import UsersResolver from './users.resolvers';
import LocalStrategy from './local.strategy';
import JwtStrategy from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, News]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver, LocalStrategy, JwtStrategy],
})
export default class UsersModule {}
