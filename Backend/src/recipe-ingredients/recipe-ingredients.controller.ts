import { Controller, Get, Post, Body } from '@nestjs/common';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipeDetailsDto } from './dto/get-recipe-details.dto';
import { Recipes } from '../recipes/recipes';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipe-details')
export class RecipeIngredientsController {
  constructor(
    private readonly recipeDetailsService: RecipeIngredientsService,
  ) {}

  @Get()
  async getAllRecipes(): Promise<GetRecipeDetailsDto[]> {
    return this.recipeDetailsService.getAllRecipes();
  }

  @Post()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<Recipes> {
    return this.recipeDetailsService.createRecipe(createRecipeDto);
  }

  @Get('details')
  async getRecipesDetails(): Promise<GetRecipeDetailsDto[]> {
    return this.recipeDetailsService.getAllRecipes();
  }
}