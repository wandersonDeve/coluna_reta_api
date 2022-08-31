export class User {
  id?: number;
  name: string;
  role: string;
  email: string;
  passwordHash: string;
  recoverPasswordToken?: string;
  institutions?: number[];
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted?: boolean;
}
