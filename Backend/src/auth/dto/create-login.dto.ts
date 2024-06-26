import { IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @Length(8, 20)
  username: string;

  @IsString()
  @Length(8, 100)
  password: string;
}