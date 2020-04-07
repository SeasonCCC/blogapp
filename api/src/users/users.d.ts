import { ObjectID } from 'typeorm';

export interface UsersRO {
  id: ObjectID

  username: string

  password: string

  type: number

  createTime: number

  updateTime: number
}
