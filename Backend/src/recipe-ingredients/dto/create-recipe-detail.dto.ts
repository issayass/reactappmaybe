import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecipeDetailDto {
  @IsString()
  @IsNotEmpty()
  ingredientName: string;

  @IsString()
  @IsNotEmpty()
  qty: string;
}