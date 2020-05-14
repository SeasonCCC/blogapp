/*
 * @Author: Season
 * @Date: 2020-05-14 15:17:04
 * @LastEditTime: 2020-05-14 15:17:07
 * @FilePath: \api\src\auth\local-auth.guard.ts
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class LocalAuthGuard extends AuthGuard('local') {}
