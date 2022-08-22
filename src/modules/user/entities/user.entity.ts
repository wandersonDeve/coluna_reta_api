import { Institution } from 'src/modules/institution/entities/institution.entity';

export class User {
  id?: number;
  name: string;
  role: string;
  email: string;
  passwordHash: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted?: boolean;
  institutions?: UsersHasInstitution;
}

type UsersHasInstitution = {
  id: number;
  user: User;
  user_id: number;
  institution: Institution;
  institution_id: number;
  created_at: Date;
  deleted: boolean;
};
