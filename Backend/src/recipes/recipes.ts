import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RecipeIngredients } from '@/recipe-ingredients/recipe-ingredients';
import { OrderDetails } from '@/order-details/order-details';

@Entity()
export class Recipes {
  @PrimaryColumn({ nullable: false })
  recipeName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: ['appetizer', 'main_course', 'dessert', 'beverage'],
    default: 'main_course',
  })
  mealType: 'appetizer' | 'main_course' | 'dessert' | 'beverage';

  @OneToMany(() => RecipeIngredients, (recipeDetails) => recipeDetails.recipe)
  recipeDetails: RecipeIngredients[];

  @OneToMany(
    () => OrderDetails,
    (orderDetails: OrderDetails) => orderDetails.recipe,
  )
  orderDetails: OrderDetails;
}