/*
 * @Author: Season
 * @Date: 2020-05-16 16:39:29
 * @LastEditTime: 2020-05-16 16:48:36
 * @LastEditors: Season
 * @FilePath: \api\src\shared\guard\jwt-gql-auth.guard.ts
 */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
