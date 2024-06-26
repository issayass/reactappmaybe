import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderDto } from './dto/get-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Orders> {
    const total = createOrderDto.total;
    const totalFloat = parseFloat(total);
    const order = this.orderRepository.create({
      total: totalFloat,
    });
    return await this.orderRepository.save(order);
  }

  async getOrder(getOrderDto: GetOrderDto): Promise<Orders> {
    return await this.orderRepository.findOne({
      where: { orderId: parseInt(getOrderDto.orderId) },
    });
  }

  async getOrders(): Promise<Orders[]> {
    return await this.orderRepository.find();
  }
}