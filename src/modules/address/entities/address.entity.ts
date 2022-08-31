import { Prisma } from '@prisma/client';

export class Address implements Prisma.AddressUncheckedCreateInput {
  id?: number;
  zip_code: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  created_at?: string | Date;
  institution?: Prisma.InstitutionUncheckedCreateNestedOneWithoutAddressInput;
}
