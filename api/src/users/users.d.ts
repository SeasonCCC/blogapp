/*
 * @Author: Season
 * @Date: 2020-04-07 15:32:50
 * @LastEditTime: 2020-06-09 14:41:57
 * @FilePath: \api\src\users\users.d.ts
 */
import { ObjectID } from 'typeorm';

export interface UsersRO {
  id: ObjectID

  username: string

  password: string

  type: number

  createTime: number

  updateTime: number

  token?: string
}
