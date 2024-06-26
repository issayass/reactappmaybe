import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestockItems } from './restockitems';
import { RestockItemsService } from './restockitems.service';
import { RestockItemsController } from './restockitems.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RestockItems])],
  providers: [RestockItemsService],
  controllers: [RestockItemsController],
})
export class RestockItemsModule {}
