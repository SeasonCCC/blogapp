import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @Column()
  type: number

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date

  async toResponseObject(showToken: boolean = true) {
    const { id, username, type, createTime, updateTime, token } = this
    const responseObject: any = { id, username, type, createTime, updateTime }

    if (showToken) {
      responseObject.token = token
    }
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
