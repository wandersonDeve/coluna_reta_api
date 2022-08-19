import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateInstitutionDto } from '../dto/create-institution';

export class InstitutionRepository extends PrismaClient {
  async createInstitution({
    name,
    phone_number,
    address_id,
  }: CreateInstitutionDto) {
    return this.institution
      .create({
        data: {
          name,
          phone_number,
          address_id,
        },
      })
      .catch(handleError);
  }
}
