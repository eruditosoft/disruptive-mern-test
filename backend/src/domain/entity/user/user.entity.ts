import { ROLE } from '@shared/enum/roles';

export class UserEntity {
  constructor(
    public id: string,
    public alias: string,
    public email: string,
    public role: ROLE
  ) { }
}