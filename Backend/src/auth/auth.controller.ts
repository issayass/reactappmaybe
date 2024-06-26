import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSecondFactorDto } from './dto/create-second-factor.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateLoginDto } from '@/auth/dto/create-login.dto';
import { UserInfoService } from '@/user-management/services/user-info.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userInfoService: UserInfoService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() createLoginDto: CreateLoginDto,
    @Res() res: any,
    @Req() req: any,
  ): Promise<{ success: boolean }> {
    const userInfo = await this.userInfoService.getInfo(req.username);
    res.cookie('otp_token', await this.authService.generateOtpToken(userInfo), {
      httpOnly: true,
      maxAge: 300000,
      sameSite: 'strict',
      secure: true,
    });
    return res.status(202).send({
      success: true,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('verify-otp')
  async secondFactor(
    @Body() createSecondFactorDto: CreateSecondFactorDto,
    @Res() res: any,
    @Req() req: any,
  ): Promise<{ success: boolean }> {
    // Username will be saved client-side.
    const token = await this.authService.verifyOtp(
      req.sub,
      createSecondFactorDto.code,
    );
    if (!token) {
      throw new UnauthorizedException('Incorrect or expired OTP');
    }
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1800000,
      sameSite: 'strict',
      secure: true,
    });

    res.clearCookie('otp_token');

    return res.status(200).send({ success: true });
  }
}