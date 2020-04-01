import {
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Request, Response } from 'express';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
// import getLogger from './log4js.config';

// const resLogger = getLogger('req');
// const errLogger = getLogger('err');
// const othLogger = getLogger('oth');

@Catch(HttpException)
export default class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    console.log('HttpException');
    // console.log(gqlHost);
    return exception;
  }
}
