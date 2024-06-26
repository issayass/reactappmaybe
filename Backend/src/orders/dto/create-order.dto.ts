import { IsDecimal, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsDecimal()
  total: string;
}