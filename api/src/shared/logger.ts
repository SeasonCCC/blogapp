import { LoggerService } from '@nestjs/common'
import { getLogger } from './log4js.config'

const logger = getLogger()

export class Logger implements LoggerService {
  log(message: string) {
    logger.debug(message)
  }

  error(message: string, trace: string) {
    logger.error(message, trace)
  }

  warn(message: string) {
    logger.warn(message)
  }

  debug(message: string) {
    logger.debug(message)
  }

  verbose(message: string) {
    logger.info(message)
  }
}
