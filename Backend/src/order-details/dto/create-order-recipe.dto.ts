import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderRecipeDto {
  @IsString()
  @IsNotEmpty()
  recipeName: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;
}