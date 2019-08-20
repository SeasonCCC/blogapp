import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Min, Max, IsInt } from 'class-validator'
import { News } from '../news/news.entity'

export class UsersDTO {
  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  username: string

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  password: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  @ApiModelProperty()
  type: number
}

export class UsersRO {
  id: string

  username: string

  password: string

  type: number

  news?: News[]

  token?: string
}
