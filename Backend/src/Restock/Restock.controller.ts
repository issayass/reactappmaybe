import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RestockService } from './restock.service';
import { Restock } from './restock';
import { RestockItems } from './restockitems';
import { CreateRestockDto } from './dto/restock.dto';
import { CreateRestockItemsDto, UpdateRestockItemsDto } from './dto/restockitems.dto';

@Controller('restocks')
export class RestockController {
  constructor(private readonly restockService: RestockService) {}

  @Get()
  async findAllRestocks(): Promise<Restock[]> {
    return this.restockService.findAllRestocks();
  }

  @Get('items')
  async findAllRestockItems(): Promise<RestockItems[]> {
    return this.restockService.findAllRestockItems();
  }

  @Post()
  async createRestock(@Body() createRestockDto: CreateRestockDto): Promise<Restock> {
    return this.restockService.createRestock(createRestockDto);
  }

  @Post('items')
  async createRestockItem(@Body() createRestockItemsDto: CreateRestockItemsDto): Promise<RestockItems> {
    return this.restockService.createRestockItem(createRestockItemsDto);
  }

  @Put('items/:id')
  async updateRestockItem(@Param('id') id: number, @Body() updateRestockItemsDto: UpdateRestockItemsDto): Promise<RestockItems> {
    return this.restockService.updateRestockItem(id, updateRestockItemsDto);
  }
}
