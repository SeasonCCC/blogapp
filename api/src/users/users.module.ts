import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/news/news.entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [UsersController],
})
export class UsersModule {}
