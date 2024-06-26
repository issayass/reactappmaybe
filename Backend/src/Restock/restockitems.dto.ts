import { IsDate, IsNumber } from 'class-validator';

export class CreateRestockItemsDto {
  @IsNumber()
  readonly restockId: number;

  @IsNumber()
  readonly ingredientId: number;

  @IsNumber()
  readonly qty: number;

  @IsDate()
  readonly expiration_date: Date;

  @IsNumber()
  readonly price_restock: number;

  @IsNumber()
  readonly price_current: number;
}

export class UpdateRestockItemsDto {
  @IsNumber()
  readonly qty?: number;

  @IsDate()
  readonly expiration_date?: Date;

  @IsNumber()
  readonly price_restock?: number;

  @IsNumber()
  readonly price_current?: number;
}
