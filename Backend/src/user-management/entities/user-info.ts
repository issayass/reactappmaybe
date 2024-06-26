import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { UserCredentials } from '@/user-management/entities/user-credentials';
import { _Role } from '@/user-management/enums/role-enum';

@Entity()
@Unique(['username'])
export class UserInfo {
  @PrimaryColumn()
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ type: 'enum', enum: _Role, nullable: false })
  userRole: _Role;

  // Create a one-to-one relationship with the emp_info relation.
  // The join column indicates the username is a foreign key.
  @OneToOne(
    () => UserCredentials,
    (userCredentials) => userCredentials.userInfo,
  )
  // The @JoinColumn annotation indicates the username field is a foreign key in this relation.
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  userCredentials: UserCredentials;
}