/*
 * @Author: Season
 * @Date: 2019-11-26 21:34:53
 * @LastEditTime: 2020-05-05 10:31:52
 * @LastEditors: Season
 * @FilePath: \api\src\app.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {
    this.appService = appService;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
