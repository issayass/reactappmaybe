import { Entity, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { UserInfo } from '@/user-management/entities/user-info';

@Entity()
export class UserCredentials {
  @PrimaryColumn()
  username: string;

  @Column({ nullable: false })
  password: string;

  // Need to include 2-factor authentication in the credentials table.
  // Code
  @Column({ nullable: true })
  twoFactorCode: string;

  // Expiration date
  @Column({ nullable: true })
  twoFactorCodeExpires: Date;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.userCredentials, {
    cascade: true,
  })
  userInfo: UserInfo;
}