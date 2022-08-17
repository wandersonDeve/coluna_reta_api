import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInstitutionDto: CreateInstitutionDto) {
    const data: Prisma.InstitutionCreateInput = {
      name: createInstitutionDto.name,
      phone_number: createInstitutionDto.phone_number,
      address: {
        connect: {
          id: createInstitutionDto.address_id,
        },
      },
    };

    return await this.prisma.institution.create({
      data,
      select: {
        id: true,
        name: true,
        address: {
          select: {
            city: true,
            state: true,
          }
        }
      }
    })
  }

  findAll() {
    return `This action returns all institution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institution`;
  }

  update(id: number, updateInstitutionDto: UpdateInstitutionDto) {
    return `This action updates a #${id} institution`;
  }

  remove(id: number) {
    return `This action removes a #${id} institution`;
  }
}
