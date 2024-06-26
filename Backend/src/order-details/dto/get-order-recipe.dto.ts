import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetOrderRecipeDto {
  @IsString()
  @IsNotEmpty()
  recipeName: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsDecimal()
  @IsNotEmpty()
  price: number;
}