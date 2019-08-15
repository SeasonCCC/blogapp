import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Users } from 'src/users/users.entity'

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

  @ManyToOne(() => Users, author => author.news)
  authorId: ObjectID
}
