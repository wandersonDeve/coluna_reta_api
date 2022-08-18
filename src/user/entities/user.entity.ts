import { UserRole } from "../util/roleUser";

export class User {
  id?: number;
  name: string;
  role: UserRole;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  active: Boolean;
}
