import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './news/news.controller';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.MONGO_URL,
    database: 'foodapp',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    useNewUrlParser: true,
  })],
  controllers: [AppController, NewsController],
  providers: [AppService],
})
export class AppModule {}
