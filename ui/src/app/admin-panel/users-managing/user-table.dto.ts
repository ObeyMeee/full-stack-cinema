import { UserStatus } from '../../shared/enums/user-status.enum';

export class UserTableDto {
  id!: string;
  firstName!: string;
  lastName!: string;
  login!: string;
  email!: string;
  phone!: string;
  status!: UserStatus;
  created?: string;
}
