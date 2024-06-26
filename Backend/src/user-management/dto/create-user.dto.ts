import { IsString, IsEmail, Length, IsEnum } from 'class-validator';
import { _Role } from '@/user-management/enums/role-enum';

export class CreateUserDto {
  @IsString()
  @Length(8, 20)
  username: string;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsEnum(_Role)
  userRole: _Role;
}