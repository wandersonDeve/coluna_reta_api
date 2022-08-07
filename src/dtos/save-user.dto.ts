import { UserRole } from "../entities/user.entity";

export class SaveUserDto {

  name: string;

  role: UserRole;

  email: string;

  passwordHash: string;

}