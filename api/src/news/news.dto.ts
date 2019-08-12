import { IsString, IsInt, IsNotEmpty } from 'class-validator'
import { ObjectID } from 'typeorm'

export type NewsStatus = 0 | 1 | 2

export class NewsDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsInt()
  status: NewsStatus
}

export class NewsRO {
  id: ObjectID

  title: string

  content: string

  status: NewsStatus

  createTime: Date
}
