import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from '../entities/user-info';
import { Repository } from 'typeorm';
import { UserCredentials } from '@/user-management/entities/user-credentials';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly empInfoRepository: Repository<UserInfo>,
  ) {}

  async createInfo(
    userCredential: UserCredentials,
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<{ success: boolean }> {
    if (userCredential.userInfo.email) {
      throw new BadRequestException(
        'Cannot place new information in existing fields',
      );
    }
    const userInfo = this.empInfoRepository.create({
      username: userCredential.username,
      email: email,
      firstName: firstName,
      lastName: lastName,
    });

    await this.empInfoRepository.save(userInfo);
    return { success: true };
  }

  async getInfo(username: string): Promise<UserInfo> {
    const userInfo = await this.empInfoRepository.findOne({
      where: { username: username },
    });

    if (!userInfo) {
      throw new BadRequestException('User does not exist');
    }

    return userInfo;
  }
}