import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from '../users/users.entity'
import { News } from '../news/news.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Users, News])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
