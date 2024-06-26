import { SetMetadata } from '@nestjs/common';
import { _Role } from '@/user-management/enums/role-enum';

export const Roles = (...roles: _Role[]) => SetMetadata('roles', roles);