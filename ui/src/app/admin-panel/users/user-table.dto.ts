import { UserStatus } from '../../shared/user-status.enum';

export class UserTableDto {
  id!: string;
  status!: UserStatus;
  activated!: string;
  firstName!: string;
  lastName!: string;
  phone!: string;
  email!: string;
  created?: string;
}
