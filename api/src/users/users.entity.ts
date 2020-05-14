/*
 * @Author: Season
 * @Date: 2020-04-07 21:10:04
 * @LastEditTime: 2020-05-14 09:33:03
 * @LastEditors: Please set LastEditors
 * @FilePath: \api\src\users\users.entity.ts
 */
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import News from '../news/news.entity';

@Entity('users')
export default class Users {
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
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  transfromCreateTime() {
    this.updateTime = Date.parse(new Date().toString()) / 1000;
    this.createTime = Date.parse(new Date().toString()) / 1000;
  }

  @BeforeUpdate()
  transfromUpdateTime() {
    this.updateTime = Date.parse(new Date().toString()) / 1000;
  }

  toResponseObject(showToken = true) {
    const {
      id, username, type, createTime, updateTime, news, token,
    } = this;
    const responseObject: any = {
      id,
      username,
      type,
      createTime,
      updateTime,
      news,
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  async comparePassword(attempt: string) {
    const result = await bcrypt.compare(attempt, this.password);
    return result;
  }

  private get token() {
    const {
      id, username, type,
    } = this;
    return jwt.sign({
      id, username, type,
    }, process.env.SECRET, { expiresIn: '7d' });
  }
}
