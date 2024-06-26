import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestockItems } from './restockitems';
import { CreateRestockItemsDto, UpdateRestockItemsDto } from './dto/restockitems.dto';

@Injectable()
export class RestockItemsService {
  constructor(
    @InjectRepository(RestockItems)
    private readonly restockItemsRepository: Repository<RestockItems>,
  ) {}

  async findAllRestockItems(): Promise<RestockItems[]> {
    return this.restockItemsRepository.find({ relations: ['restock', 'ingredient'] });
  }

  async createRestockItem(createRestockItemsDto: CreateRestockItemsDto): Promise<RestockItems> {
    const restockItem = this.restockItemsRepository.create(createRestockItemsDto);
    return this.restockItemsRepository.save(restockItem);
  }

  async updateRestockItem(id: number, updateRestockItemsDto: UpdateRestockItemsDto): Promise<RestockItems> {
    await this.restockItemsRepository.update(id, updateRestockItemsDto);
    return this.restockItemsRepository.findOne(id, { relations: ['restock', 'ingredient'] });
  }
}
