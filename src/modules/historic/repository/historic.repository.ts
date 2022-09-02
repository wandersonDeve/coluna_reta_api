import { NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateHistoricDto } from '../../../modules/historic/dto/create-historic.dto';
import { PageOptionsDto } from '../../../shared/pagination-dtos';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateConsultationDto } from '../dto/create-consultation.dto';

export class HistoricRepository extends PrismaClient {
  async createHistoric(data: CreateHistoricDto) {
    try {
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
            image_1: data.image_1,
            image_2: data.image_2,
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
            visit_date: true,
            forwarding: true,
            cobb_angle: true,
            return_date: true,
          },
        })
        .catch(handleError);
    } catch (err) {
      console.log(err);
    }
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
        include: {
          consultation: true,
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
      await prisma.$queryRaw(Prisma.sql`Select st.name, st.birth_date, st.phone, 
      inst.name as institution_name, inst.city, inst.state, inst.zip_code,
      inst.phone_number as institution_phone, hist.forwarding, hist.cobb_angle,
      hist.return_date, hist.visit_date, hist.image_1, hist.image_2
      
      from Student as st
      LEFT JOIN Institution as inst
      ON st.id = inst.id
      Left join Historic as hist
      on st.id = hist.student_id
      where st.id = ${id}
    `);

    return result[0];
  }

  async createConsultation(data: CreateConsultationDto) {
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

    const histories = await this.historic.findMany({
      where: {
        student_id: data.student_id,
        deleted: false,
      },
    });

    const lastHistory = histories.at(-1).id;

    return this.consultation.create({
      data: {
        student: {
          connect: {
            id: data.student_id,
          },
        },
        historic: {
          connect: {
            id: lastHistory,
          },
        },
        clinic: data.clinic,
        consultation_date: data.consultation_date,
      },
      include: {
        student: true,
        historic: true,
      },
    });
  }
}
