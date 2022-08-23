import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateInstitutionDto } from '../dto/create-institution';
import { UpdateInstitutionDto } from '../dto/update.institution';
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
          address: {
            connect: {
              id: address_id,
            },
          },
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
    const institutions = await this.institution
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
        where: { deleted: false },
        include: {
          users: true,
          address: true,
          student: true,
        },
      })
      .catch(handleError);

    if (institutions.length === 0) {
      throw new NotFoundException('No a institutions found');
    }

    return institutions;
  }

  async getAllInstitutions() {
    return this.institution.findMany({
      select: {
        id: true,
        name: true,
      }
    }).catch(handleError);
  }

  async findOneInstitution(institutionId: number) {
    const institution = await this.institution
      .findFirst({
        where: { id: institutionId, deleted: false },
        select: {
          id: true,
          name: true,
          phone_number: true,
          _count: {
            select: {
              student: true,
              users: true,
            },
          },
        },
      })
      .catch(handleError);

    if (!institution) {
      throw new NotFoundException(
        `Institution with Id '${institutionId}' not found!`,
      );
    }

    return institution;
  }

  async updateInstitution(
    institutionId: number,
    { ...data }: UpdateInstitutionDto,
  ) {
    const institution = await this.findOneInstitution(institutionId);

    return await this.institution
      .update({
        where: { id: institutionId },
        data: {
          name: data.name,
          phone_number: data.phone_number,
          address_id: data.address_id,
        },
      })
      .catch(handleError);
  }

  async deleteInstitution(institutionId: number) {
    const institution = await this.findOneInstitution(institutionId);

    return await this.institution
      .update({
        where: { id: institutionId },
        data: {
          deleted: true,
        },
      })
      .catch(handleError);
  }
}
