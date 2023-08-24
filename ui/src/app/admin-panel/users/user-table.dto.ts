import { UserStatus } from '../../shared/enums/user-status.enum';

export class UserTableDto {
  id!: string;
  status!: UserStatus;
  firstName!: string;
  lastName!: string;
  phone!: string;
  email!: string;
  created?: string;
}
