import { UpdateStudentDto } from './../dto/update-student.dto';
import { CreateStudentDto } from './../dto/create-student.dto';
import { PrismaClient } from '@prisma/client';
import { Student } from '../entities/student.entity';
import { handleError } from 'src/shared/utils/handle-error.util';
import { NotFoundException } from '@nestjs/common';
import { PageOptionsDto } from 'src/shared/pagination-dtos';

export class StudentRepository extends PrismaClient {
  async createStudent(data: CreateStudentDto): Promise<Student> {
    return this.student
      .create({
        data: {
          ...data,
        },
      })
      .catch(handleError);
  }

  async findOneStudentByAllData({
    name,
    birth_date,
    phone,
  }: CreateStudentDto): Promise<Student> {
    return this.student
      .findFirst({
        where: {
          name,
          birth_date,
          phone,
          deleted: false,
        },
      })
      .catch(handleError);
  }

  async findAllStudents({
    skip,
    order,
    orderByColumn,
    take,
  }: PageOptionsDto): Promise<Student[]> {
    const students = await this.student
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
        where: { deleted: false },
      })
      .catch(handleError);

    if (students.length === 0) {
      throw new NotFoundException('No a users found');
    }

    return students;
  }

  async getAllStudents(): Promise<Student[]> {
    return this.student
      .findMany({
        where: {
          deleted: false,
        },
      })
      .catch(handleError);
  }

  async findOneStudentById(id: number): Promise<Student> {
    return this.student.findFirst({
      where: {
        id,
        deleted: false,
      },
    });
  }

  async findManyStudentByParam(param: string) {
    return this.student
      .findMany({
        orderBy: [
          {
            name: 'asc',
          },
        ],
        where: {
          OR: [
            {
              name: {
                contains: param,
              },
            },
            {
              birth_date: {
                contains: param,
              },
            },
            {
              phone: {
                contains: param,
              },
            },
            {
              deleted: false,
            },
          ],
        },
        select: {
          id: true,
          name: true,
        },
      })
      .catch(handleError);
  }

  async updateStudent(
    id: number,
    { ...data }: UpdateStudentDto,
  ): Promise<Student> {
    return this.student.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteStudentByid(id: number): Promise<string> {
    this.student
      .update({
        where: {
          id,
        },
        data: {
          deleted: true,
        },
      })
      .catch(handleError);

    return 'Student deleted successfully';
  }
}
