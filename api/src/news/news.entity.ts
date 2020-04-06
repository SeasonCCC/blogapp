import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

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

  @Column()
  createTime: number

  @Column()
  updateTime: number

  @ObjectIdColumn()
  authorId?: ObjectID

  @BeforeInsert()
  transfromCreateTime() {
    this.createTime = Date.parse(new Date().toString()) / 1000;
  }

  @BeforeUpdate()
  transfromUpdateTime() {
    this.updateTime = Date.parse(new Date().toString()) / 1000;
  }
}
