import { IsDate, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateRestockDto {
  @IsNumber()
  readonly price: number;

  @IsDate()
  readonly restock_date: Date;

  @IsString()
  readonly distributor: string;

  @IsArray()
  readonly ingredients: number[]; 
}
