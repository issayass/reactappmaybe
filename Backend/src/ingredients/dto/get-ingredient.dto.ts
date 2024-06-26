import { IsNotEmpty, IsString } from 'class-validator';

export class GetIngredientDto {
  @IsString()
  @IsNotEmpty()
  ingredientName: string;
}