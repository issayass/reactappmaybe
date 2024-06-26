import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GetOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsInt()
  orderId: string;
}