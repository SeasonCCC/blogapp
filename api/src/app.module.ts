import { APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from './config/config.service'
// import { AppController } from './app.controller'
// import { AppService } from './app.service'
import { NewsModule } from './news/news.module'
import { UsersModule } from './users/users.module'
import { HttpExceptionFilter } from './shared/http-exception.filter'
import { News } from './news/news.entity'
import { Users } from './users/users.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      database: process.env.TYPEORM_DATABASE,
      entities: [News, Users],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
      useNewUrlParser: true,
      keepConnectionAlive: true,
      // useUnifiedTopology: true,
    }),
    NewsModule,
    UsersModule,
  ],
  // controllers: [AppController],
  providers: [
    // AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
    },
  ],
  exports: [ConfigService],
})
export class AppModule {}
