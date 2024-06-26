import {
  Injectable,
  InternalServerErrorException, Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// ------------------------------- Uncomment to start emailing ---------------------------------------------
// import { UserInfo } from '@/user-info/user-info'; // <==================================
// import { EmailService } from '@/email/email.service';
// -------------------- Look into login and uncomment those lines as well ----------------------------------
import * as bcrypt from 'bcrypt';
import { UserInfoService } from '@/user-management/services/user-info.service';
import { UserInfo } from '@/user-management/entities/user-info';
import { _Role } from '@/user-management/enums/role-enum';
import { UserCredentialsService } from '@/user-management/services/user-credentials.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userCredentialsService: UserCredentialsService,
    private readonly jwtService: JwtService,
    private readonly userInfoService: UserInfoService,
    // Uncomment for the email service. <============================
    // private readonly email: EmailService,
  ) {}

  // Login and two-factor authentication -------------------------------------------------------------------------

  // Login -------------------
  async validateUser(
    username: string,
    password: string,
  ): Promise<{ success: boolean }> {
    // Get the employee's credentials.
    const user = await this.userCredentialsService.findUser(username);
    if (!user) {
      throw new UnauthorizedException('Username or password incorrect');
    } else if (!(await this.comparePassPlainToHash(password, user.password))) {
      throw new InternalServerErrorException(
        'Cannot obtain the email associated with this user',
      );
    }

    return await this.sendOtp(username);
  }

  async generateOtpToken(user: UserInfo): Promise<string> {
    const payload = { sub: user.username, email: user.email, role: null };
    return this.jwtService.sign(payload, { expiresIn: '5m' });
  }

  // Send OTP for two-factor auth.
  async sendOtp(username: string): Promise<{ success: boolean }> {
    if (!(await this.userCredentialsService.wasOtpCreated(username))) {
      throw new InternalServerErrorException(
        'Could not create one time password',
      );
    }

    // Get personal info for email.
    const userInfo = this.userInfoService.getInfo(username);
    if (!userInfo) {
      throw new InternalServerErrorException('User information not found.');
    }
    // Uncomment these lines to receive emails.
    // -----------------------------------------------------------------
    // const subject = `Authentication Code`; // Subject: authentication code
    // const text = `Hello, ${userInfo.f_name}, this is your authentication code: // <================================
    // ${authCode}`; // Personalized message for the authentication code.
    // await this.email.sendEmail(userInfo.email, subject, text);
    // -----------------------------------------------------------------

    return { success: true };
  }

  // Two-factor authentication.

  async verifyOtp(username: string, authCode: string): Promise<string> {
    if (!(await this.userCredentialsService.isOtpValid(username, authCode))) {
      throw new UnauthorizedException('OTP is expired or incorrect');
    }
    return await this.generateFinalJwtToken(username);
  }

  private async generateFinalJwtToken(username: string): Promise<string> {
    // Put the user role into a payload.
    const userInfo = await this.userInfoService.getInfo(username);
    const payload = {
      sub: userInfo.username,
      role: userInfo.userRole,
      iat: Math.floor(Date.now() / 1000), // Add timestamps to the cookies to reduce the risk of reuse
    };
    console.log(payload);
    return this.jwtService.sign(payload);
  }

  // Compare this password to the hashed password from this employee object.
  private async comparePassPlainToHash(
    plaintext: string,
    hashedPass: string,
  ): Promise<boolean> {
    return bcrypt.compare(plaintext, hashedPass);
  }
}