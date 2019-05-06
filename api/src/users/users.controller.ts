import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { UsersDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.showAll();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UsersDTO) {
    return this.usersService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UsersDTO) {
    return this.usersService.register(data);
  }
}
