import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Min, Max, IsInt, Length } from 'class-validator'
import { News } from '../news/news.entity'

export class UsersDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  @ApiProperty()
  type: number
}

export class UpdateTypeDto {
  @IsNotEmpty()
  @IsString()
  @Length(24)
  @ApiProperty()
  id: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  @ApiProperty()
  type: number
}

export class ChangePassowrdDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
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
