import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if (!request.headers.authorization) {
      return false
    }

    await this.validateToken(request.headers.authorization)

    // return validateToken(request)
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'token') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
    }

    const token = auth.split(' ')[1]

    try {
      const decoded = await jwt.verify(token, process.env.SECRET)
      return decoded
    } catch (error) {
      const msg = `Token error: ${error.message || error.name}`
      throw new HttpException(msg, HttpStatus.FORBIDDEN)
    }
  }
}
