import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restock } from './restock.entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class RestockItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  restockDate: Date;

  @Column()
  expirationDate: Date;

  @ManyToOne(type => Restock, restock => restock.restockItems)
  restock: Restock;

  @ManyToOne(type => Ingredient, ingredient => ingredient.restockItems)
  ingredient: Ingredient;
}
