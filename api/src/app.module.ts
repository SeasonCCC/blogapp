import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';

@Module({
  imports: [TypeOrmModule.forRoot(), NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
