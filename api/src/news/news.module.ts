import { Module } from '@nestjs/common'
// import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { NewsResolver } from './news.resolvers'

import { News } from './news.entity'
import { Users } from '../users/users.entity'

@Module({
  imports: [TypeOrmModule.forFeature([News, Users])],
  controllers: [NewsController],
  providers: [NewsService, NewsResolver],
})
export class NewsModule {}
