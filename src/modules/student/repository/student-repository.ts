import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PageOptionsDto } from '../../../shared/pagination-dtos';
import { handleError } from '../../../shared/utils/handle-error.util';
import { Student } from '../entities/student.entity';
import { CreateStudentDto } from './../dto/create-student.dto';
import { UpdateStudentDto } from './../dto/update-student.dto';

export class StudentRepository extends PrismaClient {
  async createStudent(data: CreateStudentDto): Promise<Student> {
    await this.validationInstitutionExists(data);

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
  }: CreateStudentDto): Promise<any> {
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
        include: {
          institution: true,
        },
      })
      .catch(handleError);

    if (students.length === 0) {
      throw new NotFoundException('No a students found');
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
        historic: true,
      },
    });

    if (!student) {
      return student;
    }

    delete student.deleted;

    return student;
  }

  async findManyStudentByParam(
    where: object,
    { skip, order, orderByColumn, take }: PageOptionsDto,
  ) {
    return this.student
      .findMany({
        where,
        include: {
          institution: true,
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
    await this.validationInstitutionExists(data);

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

  async validationInstitutionExists(data) {
    const institution = await this.institution.findFirst({
      where: {
        id: data.institution_id,
        deleted: false,
      },
    });

    if (!institution) {
      throw new NotFoundException(
        `Institution with Id '${data.institution_id}' not found! Please enter an Id of an existing institution!`,
      );
    }
  }
}
