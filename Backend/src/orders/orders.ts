import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from '@/order-details/order-details';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  total: number;

  @CreateDateColumn()
  date: string;

  @OneToMany(
    () => OrderDetails,
    (orderDetails: OrderDetails) => orderDetails.order,
  )
  orderDetails: OrderDetails;
}