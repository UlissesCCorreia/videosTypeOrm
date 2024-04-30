import { IsDateString, IsString } from 'class-validator';

export class UserDto {
  id?: number;

  @IsString()
  name?: string;

  @IsString()
  email?: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsDateString()
  borndate?: Date;
}
