import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restock } from './restock';
import { RestockItems } from './restockitems';
import { CreateRestockDto } from './dto/restock.dto';
import { CreateRestockItemsDto, UpdateRestockItemsDto } from './dto/restockitems.dto';

@Injectable()
export class RestockService {
  constructor(
    @InjectRepository(Restock)
    private readonly restockRepository: Repository<Restock>,
    @InjectRepository(RestockItems)
    private readonly restockItemsRepository: Repository<RestockItems>,
  ) {}

  async findAllRestocks(): Promise<Restock[]> {
    return this.restockRepository.find({ relations: ['ingredients'] });
  }

  async findAllRestockItems(): Promise<RestockItems[]> {
    return this.restockItemsRepository.find({ relations: ['restock', 'ingredient'] });
  }

  async createRestock(createRestockDto: CreateRestockDto): Promise<Restock> {
    const restock = this.restockRepository.create(createRestockDto);
    return this.restockRepository.save(restock);
  }

  async createRestockItem(createRestockItemsDto: CreateRestockItemsDto): Promise<RestockItems> {
    const restockItem = this.restockItemsRepository.create(createRestockItemsDto);
    restockItem.expirationDate = new Date(restockItem.restockDate);
    restockItem.expirationDate.setDate(restockItem.restockDate.getDate() + 10);
    return this.restockItemsRepository.save(restockItem);
  }

  async updateRestockItem(id: number, updateRestockItemsDto: UpdateRestockItemsDto): Promise<RestockItems> {
    await this.restockItemsRepository.update(id, {
      ...updateRestockItemsDto,
      expirationDate: new Date(updateRestockItemsDto.restockDate).setDate(new Date(updateRestockItemsDto.restockDate).getDate() + 10)
    });
    return this.restockItemsRepository.findOne(id, { relations: ['restock', 'ingredient'] });
  }
}
