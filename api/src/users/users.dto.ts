import {
  IsNotEmpty, IsString, Min, Max, IsInt, Length,
} from 'class-validator';
import News from '../news/news.entity';

export class UsersDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  type: number
}

export class UpdateTypeDto {
  @IsNotEmpty()
  @IsString()
  @Length(24)
  id: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  type: number
}

export class ChangePassowrdDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  newPassword: string
}

export class UsersRO {
  id: string

  username: string

  password: string

  type: number

  news?: News[]

  token?: string
}
