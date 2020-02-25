import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { getLogger } from './log4js.config'
import { GqlExecutionContext } from '@nestjs/graphql'

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
    // const request =
    //   JSON.stringify(context.switchToHttp().getRequest()) !== '{}'
    //     ? context.switchToHttp().getRequest()
    //     : GqlExecutionContext.create(context).getContext().req

    // const response =
    //   JSON.stringify(context.switchToHttp().getResponse()) !== '{}'
    //     ? context.switchToHttp().getResponse()
    //     : GqlExecutionContext.create(context).getContext().res

    const request = GqlExecutionContext.create(context).getContext().req
    const response = GqlExecutionContext.create(context).getContext().res
    console.log(request.get('Authorization'))

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
