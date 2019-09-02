import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { News } from 'src/news/news.entity'

@Entity('users')
export class Users {
  @ObjectIdColumn()
  id: ObjectID

  @Column({
    type: 'text',
    unique: true,
  })
  username: string

  @Column()
  password: string

  @Column()
  type: number

  @Column()
  createTime: number

  @Column()
  updateTime: number

  @Column()
  news?: News[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @BeforeInsert()
  transfromCreateTime() {
    this.updateTime = this.createTime = Date.parse(new Date().toString()) / 1000
  }

  @BeforeUpdate()
  transfromUpdateTime() {
    this.updateTime = Date.parse(new Date().toString()) / 1000
  }

  toResponseObject(showToken: boolean = true) {
    const { id, username, type, createTime, updateTime, news, token } = this
    const responseObject: any = {
      id,
      username,
      type,
      createTime,
      updateTime,
      news,
    }

    if (showToken) {
      responseObject.token = token
    }

    // console.log(responseObject)
    return responseObject
  }

  async comparePassword(attempt: string) {
    const result = await bcrypt.compare(attempt, this.password)
    return result
  }

  private get token() {
    const { id, username } = this
    return jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '7d' })
  }
}
