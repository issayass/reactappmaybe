import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCredentials } from '@/user-management/entities/user-credentials';
import { UserInfo } from '@/user-management/entities/user-info';
import { EmailService } from '@/email/email.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { UserManagementModule } from '@/user-management/modules/user-management.module';
import { UserCredentialsService } from '@/user-management/services/user-credentials.service';
import { UserInfoService } from '@/user-management/services/user-info.service';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UserManagementModule,
    TypeOrmModule.forFeature([UserCredentials, UserInfo]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    EmailService,
    LocalStrategy,
    JwtStrategy,
    UserCredentialsService,
    UserInfoService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}