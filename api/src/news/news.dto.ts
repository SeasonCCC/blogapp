import { IsString, IsInt, IsNotEmpty, Min, Max } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'
import { ObjectID } from 'typeorm'
// import { Users } from 'src/users/users.entity'

export class NewsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiModelProperty()
  content: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(3)
  @ApiModelProperty()
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
