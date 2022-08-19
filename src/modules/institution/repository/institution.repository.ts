import { PrismaClient } from '@prisma/client';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateInstitutionDto } from '../dto/create-institution';
import { Institution } from '../entities/institution.entity';

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

  async findAllInstitutions({
    skip,
    order,
    orderByColumn,
    take,
  }: PageOptionsDto): Promise<Institution[]> {
    return this.institution
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
        where: { deleted: false },
      })
      .catch(handleError);
  }

  async getAllInstitutions(): Promise<Institution[]> {
    return this.institution.findMany().catch(handleError);
  }
}
