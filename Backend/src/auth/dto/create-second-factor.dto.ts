import { IsString, Length } from 'class-validator';

export class CreateSecondFactorDto {
  @IsString()
  @Length(6, 6)
  code: string;
}