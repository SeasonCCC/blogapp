import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { NewsController } from './news/news.controller';
import { NewsModule } from './news/news.module';

@Module({
  imports: [TypeOrmModule.forRoot(), NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
