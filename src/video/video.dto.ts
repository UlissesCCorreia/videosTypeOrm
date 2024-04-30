import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class VideoDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(500)
  url: string;

  @IsInt()
  recommendedage: number;
}
