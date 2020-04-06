import { ObjectID } from 'typeorm';

export interface NewsRO {
  id: ObjectID

  title: string

  content: string

  status: number

  createTime: number

  updateTime: number

  authorId: ObjectID
}
