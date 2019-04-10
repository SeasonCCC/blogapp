import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller('news')
export class NewsController {
  @Get()
  getAllUsers() {
    return [{ name: 'semlinker', age: 32 }];
  }
}
