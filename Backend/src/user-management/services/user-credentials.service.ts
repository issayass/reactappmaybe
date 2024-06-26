import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentials } from '../entities/user-credentials';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class UserCredentialsService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly userCredentialsRepository: Repository<UserCredentials>,
  ) {}

  async findUser(username: string): Promise<UserCredentials> {
    const userCredentials = await this.userCredentialsRepository.findOne({
      where: { username: username },
    });
    if (!userCredentials) {
      throw new UnauthorizedException('Could not find user');
    }
    return userCredentials;
  }

  async wasOtpCreated(username: string): Promise<boolean> {
    const otpInfo = this.userCredentialsRepository.create({
      username: username,
      twoFactorCode: await this.genTwoFactorCode(),
      twoFactorCodeExpires: new Date(Date.now() + 30 * 60 * 1000),
    });

    try {
      await this.userCredentialsRepository.save(otpInfo);
    } catch (error) {
      throw new InternalServerErrorException('Could not create OTP');
    }

    return true;
  }

  async isOtpValid(username: string, authCode: string) {
    const userCredentials = await this.userCredentialsRepository.findOne({
      where: { username: username },
    });
    if (
      userCredentials.twoFactorCode !== authCode ||
      userCredentials.twoFactorCodeExpires < new Date()
    ) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    userCredentials.twoFactorCodeExpires = userCredentials.twoFactorCode = null;
    await this.userCredentialsRepository.save(userCredentials);

    return true;
  }

  // Generate a two-factor authentication code.
  private async genTwoFactorCode(): Promise<string> {
    return randomBytes(3).toString('hex');
  }

  async createUser(
    username: string,
    password: string,
  ): Promise<{ success: boolean }> {
    if (
      await this.userCredentialsRepository.findOne({
        where: { username: username },
      })
    ) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = this.userCredentialsRepository.create({
      username: username,
      password: hashedPass,
    });
    await this.userCredentialsRepository.save(user);
    return { success: true };
  }
}