import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredients } from './ingredients';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredients)
    private readonly ingredientsRepository: Repository<Ingredients>,
  ) {}

  async getIngredient(ingredientName: string): Promise<Ingredients> {
    return await this.ingredientsRepository.findOne({
      where: { ingredientName: ingredientName },
    });
  }

  async findOrCreateIngredient(ingredientName: string): Promise<Ingredients> {
    let ingredient = await this.ingredientsRepository.findOne({
      where: { ingredientName },
    });

    if (!ingredient) {
      ingredient = this.ingredientsRepository.create({ ingredientName });
      await this.ingredientsRepository.save(ingredient);
    }

    return ingredient;
  }

  async addIngredient(ingredientName: string): Promise<Ingredients> {
    const ingredient = new Ingredients();
    ingredient.ingredientName = ingredientName;
    return await this.ingredientsRepository.save(ingredient);
  }

  async updateQty(ingredientName: string, qty: number): Promise<Ingredients> {
    const ingredient = await this.getIngredient(ingredientName);
    ingredient.qty = qty;
    return this.ingredientsRepository.save(ingredient);
  }
}