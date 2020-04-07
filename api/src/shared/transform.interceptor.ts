import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GqlExecutionContext } from '@nestjs/graphql';
import getLogger from './log4js.config';

const resLogger = getLogger('req');

export interface Response<T> {
  data: T;
}

@Injectable()
export default class TransformInterceptor<T>
implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // const request =
    //   JSON.stringify(context.switchToHttp().getRequest()) !== '{}'
    //     ? context.switchToHttp().getRequest()
    //     : GqlExecutionContext.create(context).getContext().req

    // const response =
    //   JSON.stringify(context.switchToHttp().getResponse()) !== '{}'
    //     ? context.switchToHttp().getResponse()
    //     : GqlExecutionContext.create(context).getContext().res
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (req) {
      const { url, method } = req;
      const { statusCode } = res;

      return next.handle().pipe(
        map((data) => {
          const resData = {
            statusCode,
            timestamp: new Date().toLocaleString(),
            path: url,
            data,
            message: `${method} ${url} success`,
          };

          resLogger.debug(
            `${method} ${url}`,
            JSON.stringify(resData),
            'TransformInterceptor-Rest',
          );

          return resData;
        }),
      );
    }

    const request = GqlExecutionContext.create(context).getContext().req;

    return next.handle().pipe(
      map((data) => {
        resLogger.debug(
          `${request.method} ${request.url}`,
          JSON.stringify(data),
          'TransformInterceptor-Graphql',
        );
        return data;
      }),
    );


    // const response = GqlExecutionContext.create(context).getContext().res;

    // return next.handle().pipe(
    //   map((data) => {
    //     // const resData = {
    //     //   statusCode: response.statusCode,
    //     //   timestamp: new Date().toLocaleString(),
    //     //   path: request.url,
    //     //   data,
    //     //   message: `${request.method} ${request.url} success`,
    //     // }

    //     // resLogger.debug(
    //     //   `${request.method} ${request.url}`,
    //     //   JSON.stringify(resData),
    //     //   'TransformInterceptor',
    //     // )

    //     // return resData

    //     resLogger.debug(
    //       `${request.method} ${request.url}`,
    //       JSON.stringify(data),
    //       'TransformInterceptor',
    //     );
    //     return data;
    //   }),
    // );
  }
}
