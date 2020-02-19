import { Injectable } from '@nestjs/common'
// import { ConfigService } from './config/config.service'

@Injectable()
export class AppService {
  // private config: ConfigService
  // constructor(config: ConfigService) {
  // Please take note that this check is case sensitive!
  // console.log(config.get('PORT'))
  // this.config = config
  // }

  getHello(): string {
    return 'Hello World!' + process.env.PORT
  }
}
