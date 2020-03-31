import {
  IsString, IsInt, IsNotEmpty, Min, Max, Length,
} from 'class-validator';
// import { Users } from 'src/users/users.entity'ApiProperty

export class NewsDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(3)
  status: number
}

export class UpdateNewsDto {
  @IsNotEmpty()
  @IsString()
  @Length(24)
  id: string

  @IsString()
  title?: string

  @IsString()
  content?: string

  @IsInt()
  @Min(0)
  @Max(3)
  status?: number
}
