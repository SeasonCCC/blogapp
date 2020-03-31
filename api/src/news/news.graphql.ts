import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsString, IsInt, IsNotEmpty, Min, Max, Length,
} from 'class-validator';

@ObjectType()
export default class News {
  @Field({ nullable: false })
  @IsString()
  @Length(24)
  id: string

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string

  @Field()
  @IsNotEmpty()
  @IsString()
  content: string

  @Field()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(3)
  status: number

  @Field()
  createTime: number

  @Field()
  authorId: string
}
