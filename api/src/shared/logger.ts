import { LoggerService } from '@nestjs/common';
import getLogger from './log4js.config';

const logger = getLogger();

export default class CustomLogger implements LoggerService {
  log(message: string): void {
    logger.debug(message);
  }

  error(message: string, trace: string): void {
    logger.error(message, trace);
  }

  warn(message: string): void {
    logger.warn(message);
  }

  debug(message: string): void {
    logger.debug(message);
  }

  verbose(message: string): void {
    logger.info(message);
  }
}
