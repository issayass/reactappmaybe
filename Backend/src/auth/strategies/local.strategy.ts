import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserInfoService } from '@/user-management/services/user-info.service';
import { UserInfo } from '@/user-management/entities/user-info';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userInfoService: UserInfoService,
  ) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{ user: UserInfo }> {
    const userCredentials = await this.authService.validateUser(
      username,
      password,
    );
    if (!userCredentials) {
      throw new UnauthorizedException();
    }
    return { user: await this.userInfoService.getInfo(username) };
  }
}