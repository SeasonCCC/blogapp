/*
 * @Author: Season
 * @Date: 2020-04-07 21:10:04
 * @LastEditTime: 2020-04-14 22:25:27
 * @LastEditors: Season
 * @FilePath: \api\src\users\users.graphql.ts
 */
import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsString, IsInt, IsNotEmpty, Min, Max, Length,
} from 'class-validator';
import News from '../news/news.graphql';

@ObjectType()
export default class Users {
  @Field()
  @IsString()
  @Length(24)
  id: string

  @Field()
  @IsNotEmpty()
  @IsString()
  username: string

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  password: string

  @Field()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  type: number

  @Field()
  createTime: number

  @Field()
  updateTime: number

  @Field()
  token: string

  @Field(() => [News])
  news: News[]
}
