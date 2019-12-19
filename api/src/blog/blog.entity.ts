import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity('blog')
export class Blog {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column()
  link: string

  @Column()
  date: string

  @Column()
  source: string
}
