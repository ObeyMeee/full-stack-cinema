import { CrewMemberRoleDto } from '../../shared/enums/crew-member-role.enum';

export class CrewMemberDto {
  id!: number;
  fullName!: string;
  roles!: CrewMemberRoleDto[];
}
