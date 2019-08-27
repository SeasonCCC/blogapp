import { APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { NewsModule } from './news/news.module'
import { UsersModule } from './users/users.module'
import { HttpExceptionFilter } from './shared/http-exception.filter'

@Module({
  imports: [TypeOrmModule.forRoot(), NewsModule, UsersModule],
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
