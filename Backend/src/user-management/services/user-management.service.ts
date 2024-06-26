import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentials } from '@/user-management/entities/user-credentials';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@/user-management/dto/create-user.dto';
import { UserInfo } from '@/user-management/entities/user-info';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly userCredentialsRepository: Repository<UserCredentials>,
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ success: boolean }> {
    try {
      const { username, password, email, firstName, lastName, userRole } =
        createUserDto;

      if (
        !(await this.userCredentialsRepository.find({ where: { username } }))
      ) {
        const hashedPass = await this.hashPassword(password);
        const userCredentials = this.userCredentialsRepository.create({
          username: username,
          password: hashedPass,
          userInfo: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            userRole: userRole,
          },
        });
        await this.userCredentialsRepository.save(userCredentials);
        return { success: true };
      } else {
        throw new Error('User already exists');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCredentialAndInfo(username: string): Promise<UserCredentials> {
    return await this.userCredentialsRepository.findOne({
      where: { username: username },
      relations: ['userInfo'], // Load the userInfo relation for easy data access.
    });
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}