import { IsString, Length } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @Length(4, 20)
  ingredientName: string;
}