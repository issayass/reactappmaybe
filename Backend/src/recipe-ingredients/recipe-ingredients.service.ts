import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipes } from '../recipes/recipes';
import { RecipeIngredients } from './recipe-ingredients';
import { IngredientsService } from '../ingredients/ingredients.service';
import { RecipesService } from '../recipes/recipes.service';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipeDetailsDto } from './dto/get-recipe-details.dto';
import { GetIngredientQuantityDto } from './dto/get-ingredient-quantity.dto';

@Injectable()
export class RecipeIngredientsService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
    @InjectRepository(RecipeIngredients)
    private readonly recipeDetailsRepository: Repository<RecipeIngredients>,
    private readonly ingredientsService: IngredientsService,
    private readonly recipesService: RecipesService,
  ) {}

  async getRecipesDetails(): Promise<RecipeIngredients[]> {
    return await this.recipeDetailsRepository.find();
  }

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipes> {
    const recipe = await this.recipesService.addRecipe(createRecipeDto);
    const ingredients = createRecipeDto.ingredients;

    for (const ingredientDto of ingredients) {
      const ingredient = await this.ingredientsService.findOrCreateIngredient(
        ingredientDto.ingredientName,
      );

      const recipeDetail = this.recipeDetailsRepository.create({
        recipeName: recipe.recipeName,
        ingredientName: ingredient.ingredientName,
        qty: parseInt(ingredientDto.qty),
      });

      await this.recipeDetailsRepository.save(recipeDetail);
    }
    return recipe;
  }

  async getAllRecipes(): Promise<GetRecipeDetailsDto[]> {
    const recipes = await this.recipesRepository.find({
      relations: ['recipeDetails', 'recipeDetails.ingredient'],
    });

    const recipeMap = new Map<
      string,
      { price: number; ingredients: GetIngredientQuantityDto[] }
    >();

    recipes.forEach((recipe) => {
      const recipeName = recipe.recipeName;
      if (!recipeMap.has(recipeName)) {
        recipeMap.set(recipeName, { price: recipe.price, ingredients: [] });
      }

      const recipeDetails = recipeMap.get(recipeName);
      recipe.recipeDetails.forEach((detail) => {
        const ingredientQuantity: GetIngredientQuantityDto = {
          ingredientName: detail.ingredient.ingredientName,
          qty: detail.qty,
        };
        recipeDetails.ingredients.push(ingredientQuantity);
      });
    });

    const result: GetRecipeDetailsDto[] = [];
    recipeMap.forEach((value, recipeName) => {
      const recipeDetailsDto: GetRecipeDetailsDto = {
        recipeName,
        price: value.price,
        ingredientAndQty: value.ingredients,
      };
      result.push(recipeDetailsDto);
    });

    return result;
  }
}