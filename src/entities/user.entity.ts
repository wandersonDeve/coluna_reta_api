import { UserRole } from "@prisma/client";

export class User {
  id?: string;
  name: string;
  role: UserRole;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}
