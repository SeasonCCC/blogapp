import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { ValidationPipe } from '../shared/validation.pipe'
import { UsersDto, UpdateTypeDto } from './users.dto'
import { AuthGuard } from '../shared/auth.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService
  }

  @Get()
  @UseGuards(new AuthGuard())
  getAllUsers() {
    return this.usersService.showAll()
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UsersDto) {
    return this.usersService.login(data)
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UsersDto) {
    return this.usersService.register(data)
  }

  @Post('updateType')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  updateType(@Body() data: UpdateTypeDto) {
    return this.usersService.updateType(data)
  }
}
