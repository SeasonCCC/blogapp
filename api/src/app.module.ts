/*
 * @Author: Season
 * @Date: 2020-04-02 10:14:20
 * @LastEditTime: 2020-05-14 15:19:25
 * @FilePath: \api\src\app.module.ts
 */
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'path';

import { config } from 'dotenv';
import AuthModule from './auth/auth.module';
import AppController from './app.controller';
import AppService from './app.service';
import NewsModule from './news/news.module';
import UsersModule from './users/users.module';
import News from './news/news.entity';
import Users from './users/users.entity';
import HttpExceptionFilter from './shared/http-exception.filter';
import TransformInterceptor from './shared/transform.interceptor';

config({ path: resolve(__dirname, '../.env') });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      database: process.env.TYPEORM_DATABASE,
      entities: [News, Users],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
      useNewUrlParser: true,
      keepConnectionAlive: true,
      useUnifiedTopology: true,
    }),
    NewsModule,
    UsersModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export default class AppModule {}
