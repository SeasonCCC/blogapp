import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

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

  @Column()
  type: number;

  @CreateDateColumn()
  createTime: Date;

  toResponseObject() {
    const {username, password, type, createTime} = this;
    return { username, password, type, createTime };
  }
}
