import {
  Injectable,
  CanActivate,
  // ExecutionContext,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest()

    // const ctx = GqlExecutionContext.create(context)
    // const { request } = context.switchToHttp()

    // console.log(context.switchToHttp())

    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    // console.log(request)
    const authorization = request.get('Authorization')

    if (!authorization) {
      return false
    }

    request.user = await this.validateToken(authorization)
    return true
    // return validateToken(request)
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'token') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
    }

    const token = auth.split(' ')[1]

    try {
      const decoded = await jwt.verify(token, process.env.SECRET)
      // const decoded = await jwt.verify(token, '12345678')
      return decoded
    } catch (error) {
      const msg = `Token error: ${error.message || error.name}`
      throw new HttpException(msg, HttpStatus.FORBIDDEN)
    }
  }
}
