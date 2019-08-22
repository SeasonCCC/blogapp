import { LoggerService } from '@nestjs/common'
import * as log4js from 'log4js'
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'log/cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
})

export class Logger implements LoggerService {
  log(message: string) {
    const logger = log4js.getLogger()
    logger.level = 'debug'
    logger.info(message)
  }

  error(message: string, trace: string) {
    const logger = log4js.getLogger()
    logger.level = 'debug'
    logger.error(message, trace)
  }

  warn(message: string) {
    const logger = log4js.getLogger()
    logger.level = 'debug'
    logger.warn(message)
  }

  debug(message: string) {
    const logger = log4js.getLogger()
    logger.level = 'debug'
    logger.debug(message)
  }

  verbose(message: string) {
    const logger = log4js.getLogger()
    logger.level = 'debug'
    logger.info(message)
  }
}
