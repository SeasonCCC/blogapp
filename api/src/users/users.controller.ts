import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Param,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { ValidationPipe } from '../shared/validation.pipe'
import { UsersDto, UpdateTypeDto } from './users.dto'
import { AuthGuard } from '../shared/auth.guard'
import { User } from './users.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService
  }

  @Get()
  @UseGuards(new AuthGuard())
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  getUserById(@Param('id') id: string) {
    return this.usersService.findOne(id)
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

  @Post('changePassword')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  changePassword(@Body('password') password: string, @User() user) {
    console.log(password, user)
    // return this.usersService.changePassword(password, user)
  }
}
