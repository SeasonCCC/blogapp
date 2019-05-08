import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export type UserRoleType = 0 | 1 | 2;

export class UsersDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  type: UserRoleType;
}

export class UsersDO {
  id: string;

  username: string;

  password: string;

  type: UserRoleType;

  token?: string;
}
