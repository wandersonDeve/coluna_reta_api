export class User {
  id?: number;
  name: string;
  role: string;
  email: string;
  passwordHash: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted?: boolean;
}
