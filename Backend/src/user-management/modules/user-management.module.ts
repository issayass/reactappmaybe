import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredentials } from '@/user-management/entities/user-credentials';
import { UserManagementService } from '@/user-management/services/user-management.service';
import { UserInfo } from '@/user-management/entities/user-info';
import { UserCredentialsService } from '@/user-management/services/user-credentials.service';
import { UserInfoService } from '@/user-management/services/user-info.service';
import { UserManagementController } from '@/user-management/controllers/user-management.controller';
import { Repository } from 'typeorm';

@Module({
  exports: [UserManagementService],
  imports: [TypeOrmModule.forFeature([UserCredentials, UserInfo])],
  providers: [
    UserManagementService,
    UserCredentialsService,
    UserInfoService,
    Repository,
  ],
  controllers: [UserManagementController],
})
export class UserManagementModule {}