import { UpdateStudentDto } from './../dto/update-student.dto';
import { CreateStudentDto } from './../dto/create-student.dto';
import { PrismaClient } from '@prisma/client';
import { Student } from '../entities/student.entity';
import { handleError } from 'src/shared/utils/handle-error.util';
import { NotFoundException } from '@nestjs/common';
import { PageOptionsDto } from 'src/shared/pagination-dtos';

export class StudentRepository extends PrismaClient {
  async createStudent(data: CreateStudentDto): Promise<Student> {
    const newStudent = await this.student
      .create({
        data: {
          ...data,
        },
      })
      .catch(handleError);

    delete newStudent.deleted;

    return newStudent;
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

  async getAllStudents(where: object): Promise<Student[]> {
    return this.student
      .findMany({
        where,
      })
      .catch(handleError);
  }

  async findOneStudentById(id: number): Promise<Student> {
    const student = await this.student.findFirst({
      where: {
        id,
        deleted: false,
      },
      include: {
        institution: true,
        address: true,
      },
    });

    delete student.deleted;
    delete student.address.deleted;
    delete student.institution.deleted;

    return student;
  }

  async findManyStudentByParam(
    where: object,
    { skip, order, orderByColumn, take }: PageOptionsDto,
  ) {
    return this.student
      .findMany({
        where,
        select: {
          id: true,
          name: true,
          birth_date: true,
        },
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
      })
      .catch(handleError);
  }

  async updateStudent(
    id: number,
    { ...data }: UpdateStudentDto,
  ): Promise<Student> {
    const updatedStudent = await this.student.update({
      where: {
        id,
      },
      data,
    });

    delete updatedStudent.deleted;

    return updatedStudent;
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
