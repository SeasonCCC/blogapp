import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity('users')
export class Users {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({
    default: 0,
  })
  type: number;

  @CreateDateColumn()
  createTime: Date;

  toResponseObject(showToken: boolean = true) {
    const { username, password, type, createTime, token } = this;
    const responseObject: any = { username, password, type, createTime };

    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const {id, username} = this;
    return jwt.sign(
      {id, username},
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
