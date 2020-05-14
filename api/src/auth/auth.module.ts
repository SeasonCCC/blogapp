/*
 * @Author: Season
 * @Date: 2020-05-14 15:05:38
 * @LastEditTime: 2020-05-14 16:55:25
 * @FilePath: \api\src\auth\auth.module.ts
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import AuthService from './auth.service';
import UsersModule from '../users/users.module';
import LocalStrategy from './local.strategy';
import JwtStrategy from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export default class AuthModule {}
