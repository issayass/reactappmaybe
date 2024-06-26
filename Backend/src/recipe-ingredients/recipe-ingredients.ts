import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Recipes } from '@/recipes/recipes';
import { Ingredients } from '@/ingredients/ingredients';

@Entity()
export class RecipeIngredients {
  // Both columns are primary in this case. This indicates a composite key.
  @PrimaryColumn()
  recipeName: string;

  @PrimaryColumn()
  ingredientName: string;

  @Column()
  qty: number;

  @ManyToOne(() => Recipes, (recipe) => recipe.recipeName)
  @JoinColumn({ name: 'recipeName' })
  recipe: Recipes;

  @ManyToOne(() => Ingredients, (ingredient) => ingredient.ingredientName)
  @JoinColumn({ name: 'ingredientName' })
  ingredient: Ingredients;
}