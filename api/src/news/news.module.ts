import { Module } from '@nestjs/common'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { News } from './news.entity'
import { Users } from '../users/users.entity'

@Module({
  imports: [TypeOrmModule.forFeature([News, Users])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
