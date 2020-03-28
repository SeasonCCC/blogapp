import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import getLogger from './log4js.config';

const resLogger = getLogger('req');
const errLogger = getLogger('err');
const othLogger = getLogger('oth');

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { message } = exception;
    // console.log(exception);

    const resObj = {
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      data: '',
      message: '',
    };

    if (status >= 200 && status <= 206) {
      resObj.data = message.data;
      resObj.message = message.message;

      resLogger.debug(
        `${request.method} ${request.url}`,
        JSON.stringify(resObj),
        'HttpExceptionFilter',
      );
    } else if (status >= 400) {
      delete resObj.data;
      resObj.message = message;

      errLogger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(resObj),
        'HttpExceptionFilter',
      );
    } else {
      delete resObj.data;
      resObj.message = message;

      othLogger.info(
        `${request.method} ${request.url}`,
        JSON.stringify(resObj),
        'HttpExceptionFilter',
      );
    }

    response.status(status).json(resObj);
  }
}
