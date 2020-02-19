import { IsString, IsInt, IsNotEmpty, Min, Max, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
// import { Users } from 'src/users/users.entity'ApiProperty

export class NewsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(3)
  @ApiProperty()
  status: number
}

export class UpdateNewsDto {
  @IsNotEmpty()
  @IsString()
  @Length(24)
  @ApiProperty()
  id: string

  @IsString()
  @ApiProperty()
  title?: string

  @IsString()
  @ApiProperty()
  content?: string

  @IsInt()
  @Min(0)
  @Max(3)
  @ApiProperty()
  status?: number
}
