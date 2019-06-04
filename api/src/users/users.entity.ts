import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

export type UserRoleType = 0 | 1 | 2

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

  @Column({
    default: 0,
  })
  type: UserRoleType

  @CreateDateColumn()
  createTime: Date

  toResponseObject(showToken: boolean = true) {
    const { id, username, password, type, createTime, token } = this
    const responseObject: any = { id, username, password, type, createTime }

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
