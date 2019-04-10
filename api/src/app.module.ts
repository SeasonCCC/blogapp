import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './news/news.controller';

@Module({
  imports: [],
  controllers: [AppController, NewsController],
  providers: [AppService],
})
export class AppModule {}
