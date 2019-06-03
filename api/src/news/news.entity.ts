import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export class News {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  type: number

  @Column()
  createTime: string
}
