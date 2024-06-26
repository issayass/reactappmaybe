import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderRecipesDto } from './dto/create-order-recipes.dto';
import { GetOrderDetailsDto } from './dto/get-order-details.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { _Role } from '@/user-management/enums/role-enum';
import { UserInfo } from '@/user-management/entities/user-info';

@Controller('order-details')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get('test-admin')
  @Roles(_Role.ADMIN)
  async getAdminProfile(@Req() req: any): Promise<UserInfo> {
    return req.user;
  }

  @Get('test-employee')
  @Roles(_Role.ADMIN, _Role.EMPLOYEE)
  async getAdminOrEmployeeProfile(@Req() req: any): Promise<UserInfo> {
    return req.user;
  }

  @Post('create')
  @Roles(_Role.ADMIN, _Role.EMPLOYEE)
  async createOrder(
    @Body() createOrderDto: CreateOrderRecipesDto,
  ): Promise<GetOrderDetailsDto> {
    return this.orderDetailsService.createOrder(createOrderDto);
  }
}