import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipes } from '../recipes/recipes';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './order-details';
import { Orders } from '../orders/orders';
import { GetOrderDetailsDto } from './dto/get-order-details.dto';
import { CreateOrderRecipesDto } from './dto/create-order-recipes.dto';
import { GetOrderRecipeDto } from './dto/get-order-recipe.dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  async createOrder(
    createOrderRecipesDto: CreateOrderRecipesDto,
  ): Promise<GetOrderDetailsDto> {
    let total = 0;

    // Create and save the order entity
    const order = this.ordersRepository.create();
    const savedOrder = await this.ordersRepository.save(order);

    // Create order details and calculate total
    const orderDetailsList: GetOrderRecipeDto[] = [];
    for (const orderRecipeDto of createOrderRecipesDto.orderDetails) {
      const recipe = await this.recipesRepository.findOne({
        where: { recipeName: orderRecipeDto.recipeName },
      });
      if (!recipe) {
        throw new Error(`Recipe ${orderRecipeDto.recipeName} not found`);
      }

      const price = recipe.price;
      const qty = orderRecipeDto.qty;
      const cost = price * qty;
      total += cost;

      const orderDetails = this.orderDetailsRepository.create({
        orderId: savedOrder.orderId,
        recipeName: recipe.recipeName,
        qty: qty,
      });
      await this.orderDetailsRepository.save(orderDetails);

      orderDetailsList.push({
        recipeName: recipe.recipeName,
        qty: qty,
        price: price,
      });
    }

    // Update the order total and save the order again
    savedOrder.total = total;
    await this.ordersRepository.save(savedOrder);

    // Return the order details DTO
    return {
      orderId: savedOrder.orderId,
      total: savedOrder.total,
      orderDetails: orderDetailsList,
    };
  }

  async getOrders(): Promise<Orders[]> {
    return await this.ordersRepository.find({
      relations: ['orderDetails', 'orderDetails.recipe'],
    });
  }
}