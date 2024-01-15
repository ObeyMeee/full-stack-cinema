export type CrewMemberRole = 'ACTOR'| 'SCREENWRITER'| 'DIRECTOR'

export class CrewMemberRoleDto {
  id!: number;
  role!: CrewMemberRole;
}
