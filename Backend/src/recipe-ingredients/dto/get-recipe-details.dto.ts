import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GetIngredientQuantityDto } from './get-ingredient-quantity.dto';

export class GetRecipeDetailsDto {
  @IsString()
  @IsNotEmpty()
  recipeName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetIngredientQuantityDto)
  ingredientAndQty: GetIngredientQuantityDto[];
}