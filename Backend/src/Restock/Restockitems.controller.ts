import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RestockItemsService } from './restockitems.service';
import { RestockItems } from './restockitems';
import { CreateRestockItemsDto, UpdateRestockItemsDto } from './dto/restockitems.dto';

@Controller('restockitems')
export class RestockItemsController {
  constructor(private readonly restockItemsService: RestockItemsService) {}

  @Get()
  async findAllRestockItems(): Promise<RestockItems[]> {
    return this.restockItemsService.findAllRestockItems();
  }

  @Post()
  async createRestockItem(@Body() createRestockItemsDto: CreateRestockItemsDto): Promise<RestockItems> {
    return this.restockItemsService.createRestockItem(createRestockItemsDto);
  }

  @Put(':id')
  async updateRestockItem(@Param('id') id: number, @Body() updateRestockItemsDto: UpdateRestockItemsDto): Promise<RestockItems> {
    return this.restockItemsService.updateRestockItem(id, updateRestockItemsDto);
  }
}
