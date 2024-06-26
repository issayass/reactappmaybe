import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserCredentialsService } from '@/user-management/services/user-credentials.service';
import { UserInfoService } from '@/user-management/services/user-info.service';
import { UserManagementService } from '@/user-management/services/user-management.service';
import { CreateUserDto } from '@/user-management/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-management')
export class UserManagementController {
  constructor(
    private readonly userCredentialsService: UserCredentialsService,
    private readonly userInfoService: UserInfoService,
    private readonly userManagementService: UserManagementService,
  ) {}

  @Post('add-user')
  @UsePipes(new ValidationPipe())
  async addUser(@Body() createUserDto: CreateUserDto) {
    return await this.userManagementService.createUser(createUserDto);
  }
}