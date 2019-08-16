import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity('news')
export class News {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  status: number

  @CreateDateColumn()
  createTime: Date

  @ObjectIdColumn()
  authorId: ObjectID
}
