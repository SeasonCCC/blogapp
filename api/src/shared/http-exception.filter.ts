/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/*
 * @Author: Season
 * @Date: 2020-04-01 16:25:22
 * @LastEditTime: 2020-04-14 11:05:28
 * @LastEditors: Please set LastEditors
 * @FilePath: \api\src\shared\http-exception.filter.ts
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { GqlExceptionFilter, GqlArgumentsHost, GqlExecutionContext } from '@nestjs/graphql';
import getLogger from './log4js.config';

const resLogger = getLogger('req');
const errLogger = getLogger('err');
const othLogger = getLogger('oth');

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const gqlHost = GqlArgumentsHost.create(host);
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (request) {
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message:
            status !== HttpStatus.INTERNAL_SERVER_ERROR
              ? (exception.message as any).error || exception.message || null
              : 'Internal server error',
      };

      // console.log(status, HttpStatus);

      if (status >= 200 && status <= 206) {
        resLogger.debug(
          `${request.method} ${request.url}`,
          JSON.stringify(errorResponse),
          'HttpExceptionFilter',
        );
      } else if (status >= 400) {
        errLogger.error(
          `${request.method} ${request.url}`,
          JSON.stringify(errorResponse),
          'HttpExceptionFilter',
        );
      } else {
        othLogger.info(
          `${request.method} ${request.url}`,
          JSON.stringify(errorResponse),
          'HttpExceptionFilter',
        );
      }

      response.status(status).json(errorResponse);
    } else {
      // const httpRequest = this.getRequestFromCtx(ctx);
      // console.log(httpRequest);
      errLogger.error(
        // `${request.method} ${request.url}`,
        JSON.stringify(exception),
        'HttpExceptionFilter',
      );

      return exception;
    }
  }
}
