import { APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { AppController } from './app.controller'
// import { AppService } from './app.service'
import { NewsModule } from './news/news.module'
import { UsersModule } from './users/users.module'
import { HttpExceptionFilter } from './shared/http-exception.filter'
import { News } from './news/news.entity'
import { Users } from './users/users.entity'
import { Blog } from './blog/blog.entity'

import { ConfigModule } from './config/config.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { resolve } from 'path'
import { config } from 'dotenv'
import { BlogModule } from './blog/blog.module'

config({ path: resolve(__dirname, '../.env') })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      database: process.env.TYPEORM_DATABASE,
      entities: [News, Users, Blog],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
      useNewUrlParser: true,
      keepConnectionAlive: true,
      useUnifiedTopology: true,
    }),
    NewsModule,
    UsersModule,
    ConfigModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
