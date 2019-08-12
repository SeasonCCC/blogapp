import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

export type NewsStatus = 0 | 1 | 2

@Entity()
export class News {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  status: NewsStatus

  @CreateDateColumn()
  createTime: Date

  toResponseObject() {
    const { id, title, content, status, createTime } = this
    const responseObject: any = { id, title, content, status, createTime }
    return responseObject
  }
}
