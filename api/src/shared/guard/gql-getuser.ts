/*
 * @Author: Season
 * @Date: 2020-05-16 16:21:39
 * @LastEditTime: 2020-05-16 16:23:09
 * @LastEditors: Season
 * @FilePath: \api\src\shared\guard\gql-auth.ts
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

export default CurrentUser;
