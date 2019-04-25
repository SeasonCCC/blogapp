import { IsString } from 'class-validator';

export class NewsDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
