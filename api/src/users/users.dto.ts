import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class UsersDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  type: number;
}
