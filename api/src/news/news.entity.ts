import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  OneToMany,
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

  @OneToMany(() => Users, author => author.news)
  author: Users
}
