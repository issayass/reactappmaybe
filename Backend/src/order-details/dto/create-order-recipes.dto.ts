import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderRecipeDto } from './create-order-recipe.dto';

export class CreateOrderRecipesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderRecipeDto)
  orderDetails: CreateOrderRecipeDto[];
}