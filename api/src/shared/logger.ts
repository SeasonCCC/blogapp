/*
 * @Author: Season
 * @Date: 2020-03-26 09:45:18
 * @LastEditTime: 2020-04-14 10:46:52
 * @FilePath: \api\src\shared\logger.ts
 */
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
