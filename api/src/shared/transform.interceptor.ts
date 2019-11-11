import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { getLogger } from './log4js.config'

const resLogger = getLogger('req')

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse() || 200
    const request = ctx.getRequest()

    return next.handle().pipe(
      map(data => {
        const resData = {
          statusCode: response.statusCode,
          timestamp: new Date().toLocaleString(),
          path: request.url,
          data,
          message: `${request.method} ${request.url} success`,
        }

        resLogger.debug(
          `${request.method} ${request.url}`,
          JSON.stringify(resData),
          'TransformInterceptor',
        )

        return resData
      }),
    )
  }
}
