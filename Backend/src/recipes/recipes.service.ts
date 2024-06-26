import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipes } from './recipes';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from '@/recipe-ingredients/dto/create-recipe-dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
  ) {}

  async allRecipes(): Promise<Recipes[]> {
    return this.recipesRepository.find();
  }

  async findRecipe(recipeName: string): Promise<Recipes> {
    return this.recipesRepository.findOne({ where: { recipeName } });
  }

  async addRecipe(recipeDto: CreateRecipeDto): Promise<Recipes> {
    const recipe = new Recipes();
    recipe.recipeName = recipeDto.recipeName;
    recipe.price = parseFloat(recipeDto.price);
    recipe.mealType = recipeDto.mealType;
    try { return this.recipesRepository.save(recipe);
    } catch (error) {
      throw new InternalServerErrorException(`Error adding recipe`);
    }
  }

  async removeRecipe(recipeName: string): Promise<void> {
    try {
      const recipe = await this.findRecipe(recipeName);
      if(recipe) {
        await this.recipesRepository.remove(recipe);
      } else {
        throw new NotFoundException(`Recipe not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(`Error removing recipe`);
    }
  }
}