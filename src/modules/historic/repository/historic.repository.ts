import { NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateHistoricDto } from '../../../modules/historic/dto/create-historic.dto';
import { PageOptionsDto } from '../../../shared/pagination-dtos';
import { handleError } from '../../../shared/utils/handle-error.util';

export class HistoricRepository extends PrismaClient {
  async createHistoric(data: CreateHistoricDto) {
    const student = await this.student.findFirst({
      where: {
        id: data.student_id,
        deleted: false,
      },
    });

    if (!student) {
      throw new NotFoundException(
        `Student with Id '${data.student_id}' not found!`,
      );
    }

    return this.historic
      .create({
        data: {
          student: {
            connect: {
              id: data.student_id,
            },
          },
          forwarding: data.forwarding,
          cobb_angle: data.cobb_angle,
          return_date: data.return_date,
        },
        select: {
          id: true,
          student: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
          consultation_date: true,
          forwarding: true,
          cobb_angle: true,
          return_date: true,
        },
      })
      .catch(handleError);
  }

  async findHistoricByStudent(
    { skip, order, orderByColumn, take }: PageOptionsDto,
    studentId: number,
  ) {
    const student = await this.student
      .findFirst({
        where: {
          id: studentId,
          deleted: false,
        },
      })
      .catch(handleError);

    if (!student) {
      throw new NotFoundException(`Student with Id '${studentId}' not found!`);
    }

    const historic = await this.historic
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
        where: {
          student_id: studentId,
          deleted: false,
        },
      })
      .catch(handleError);

    if (historic.length === 0) {
      throw new NotFoundException('No a historic found');
    }

    return historic;
  }

  async getHistoricById(id: number): Promise<any> {
    const prisma = new PrismaClient();

    const result =
      await prisma.$queryRaw(Prisma.sql`SELECT student.name, student.birth_date, student.phone, historic.consultation_date, historic.cobb_angle, historic.return_date, historic.forwarding
    FROM Student as student
    LEFT JOIN Historic as historic
    ON student.id = historic.student_id
    where historic.id = ${id}
    `);

    return result[0];
  }
}
