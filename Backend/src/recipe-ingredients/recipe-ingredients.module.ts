import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { RecipeIngredientsController } from './recipe-ingredients.controller';
import { Recipes } from '../recipes/recipes';
import { RecipeIngredients } from './recipe-ingredients';
import { IngredientsService } from '../ingredients/ingredients.service';
import { RecipesService } from '../recipes/recipes.service';
import { Ingredients } from '../ingredients/ingredients';

@Module({
  imports: [TypeOrmModule.forFeature([Recipes, RecipeIngredients, Ingredients])],
  providers: [RecipeIngredientsService, IngredientsService, RecipesService],
  controllers: [RecipeIngredientsController],
})
export class RecipeIngredientsModule {}