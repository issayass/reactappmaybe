import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetIngredientQuantityDto {
  @IsString()
  @IsNotEmpty()
  ingredientName: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;
}