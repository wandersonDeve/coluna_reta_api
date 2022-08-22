import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number;
  name: string;
  role: string;
  email: string;
  passwordHash: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted?: boolean;
  institutions?: Prisma.UsersHasInstitutionUncheckedCreateNestedManyWithoutUserInput;
}
