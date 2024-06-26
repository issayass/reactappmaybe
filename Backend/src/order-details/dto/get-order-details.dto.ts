import {
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GetOrderRecipeDto } from './get-order-recipe.dto';

export class GetOrderDetailsDto {
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsDecimal()
  @IsNotEmpty()
  total: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => GetOrderRecipeDto)
  orderDetails: GetOrderRecipeDto[];
}