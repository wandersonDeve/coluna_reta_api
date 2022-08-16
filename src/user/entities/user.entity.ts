export class User {
  id?: number;
  name: string;
  role: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}
