import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsService } from './order-details.service';
import { OrderDetails } from './order-details';
import { Orders } from '../orders/orders';
import { Recipes } from '../recipes/recipes';
import { OrderDetailsController } from './order-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Recipes])],
  providers: [OrderDetailsService],
  controllers: [OrderDetailsController],
})
export class OrderDetailsModule {}