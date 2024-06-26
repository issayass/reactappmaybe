import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { RecipeIngredients } from '@/recipe-ingredients/recipe-ingredients';

@Entity()
export class Ingredients {
  @PrimaryColumn()
  ingredientName: string;

  @Column({ default: 0 })
  qty: number;

  // Many-to-many relationship; for many ingredients, we have many corresponding ids in the recipeDetails.
  @ManyToMany(
    () => RecipeIngredients,
    (recipeDetails) => recipeDetails.ingredient,
  )
  recipeDetails: RecipeIngredients[];
}