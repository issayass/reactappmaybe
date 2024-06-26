import {
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRecipeDetailDto } from './create-recipe-detail.dto';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  recipeName: string;

  @IsDecimal()
  @IsNotEmpty()
  price: string;

  // The type of meal (e.g., appetizer, main course, dessert, beverage)
  @IsString()
  @IsNotEmpty()
  mealType: 'appetizer' | 'main_course' | 'dessert' | 'beverage';

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeDetailDto)
  ingredients: CreateRecipeDetailDto[];
}