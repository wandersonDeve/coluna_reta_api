import { Prisma } from '@prisma/client';

export class Student implements Prisma.StudentUncheckedCreateInput {
  id?: number;
  name: string;
  birth_date: string;
  phone: string;
  institution_id?: number;
  address_id?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted?: boolean;
}
