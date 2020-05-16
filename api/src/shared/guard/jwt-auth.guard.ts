/*
 * @Author: Season
 * @Date: 2020-05-16 10:47:03
 * @LastEditTime: 2020-05-16 10:51:12
 * @LastEditors: Season
 * @FilePath: \api\src\users\jwt-auth.guard.ts
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {}
