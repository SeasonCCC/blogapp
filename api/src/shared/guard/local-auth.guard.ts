/*
 * @Author: Season
 * @Date: 2020-05-14 15:17:04
 * @LastEditTime: 2020-05-16 16:44:24
 * @FilePath: \api\src\shared\guard\local-auth.guard.ts
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class LocalAuthGuard extends AuthGuard('local') {}
