import { IsString, IsInt, IsNotEmpty, Min, Max } from 'class-validator'
import { ObjectID } from 'typeorm'
// import { Users } from 'src/users/users.entity'

export class NewsDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(3)
  status: number
}

export class NewsRO {
  id: ObjectID

  title: string

  content: string

  status: number

  createTime: Date

  authorId: ObjectID
}
