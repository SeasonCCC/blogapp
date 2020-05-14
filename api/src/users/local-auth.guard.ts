/*
 * @Author: Season
 * @Date: 2020-05-14 15:17:04
 * @LastEditTime: 2020-05-14 17:51:37
 * @FilePath: \api\src\users\local-auth.guard.ts
 */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export default class LocalAuthGuard extends AuthGuard('local') {}
