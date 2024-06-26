import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodeMailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodeMailer.createTransport({
      host: this.configService.get<string>('MAILGUN_HOST'),
      auth: {
        // Configured email .env file.
        user: this.configService.get<string>('MAILGUN_LOGIN'),
        pass: this.configService.get<string>('MAILGUN_PASS'),
      },
    });
  }

  // Send email to an email(subject, text) account.
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: `Excited User <mailgun@${this.configService.get<string>('MAILGUN_DOMAIN')}`,
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}