/*
 * @Author: Season
 * @Date: 2020-05-16 16:48:34
 * @LastEditTime: 2020-05-16 16:48:46
 * @LastEditors: Season
 * @FilePath: \api\src\shared\guard\local-gql-auth.guard.ts
 */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
