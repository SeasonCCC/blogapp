import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: UserSchema }])],
  controllers: [UsersController],
})
export class UsersModule {}
