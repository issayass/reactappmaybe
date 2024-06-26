import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restock } from './restock.entity';
import { RestockItems } from './restockitems';
import { RestockService } from './restock.service';
import { RestockController } from './restock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restock, RestockItems])],
  providers: [RestockService],
  controllers: [RestockController],
})
export class RestockModule {}
