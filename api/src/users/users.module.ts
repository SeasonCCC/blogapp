import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersController from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { News } from '../news/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, News])],
  controllers: [UsersController],
  providers: [UsersService],
})
export default class UsersModule {}
