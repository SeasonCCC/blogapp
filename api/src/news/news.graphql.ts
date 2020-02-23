import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class News {
  @Field({ nullable: false })
  id: string

  @Field()
  title: string

  @Field()
  content: string

  @Field()
  status: number

  @Field()
  createTime: number

  @Field()
  authorId: string
}
