import { IsNotEmpty, IsString, Min, Max, IsInt } from 'class-validator'

export type UserRoleType = 0 | 1 | 2

export class UsersDTO {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  type: UserRoleType
}

export class UsersRO {
  id: string

  username: string

  password: string

  type: UserRoleType

  token?: string
}
