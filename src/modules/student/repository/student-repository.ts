import { CreateStudentDto } from './../dto/create-student.dto';
import { PrismaClient } from '@prisma/client';
import { Student } from '../entities/student.entity';

export class StudentRepository extends PrismaClient {
  async createStudent(data: CreateStudentDto): Promise<Student> {
    return this.student.create({
      data: {
        ...data,
      },
    });
  }

  async findOneStudentByAllData({
    name,
    birth_date,
    phone,
  }: CreateStudentDto): Promise<Student> {
    return this.student.findFirst({
      where: {
        name,
        birth_date,
        phone,
      },
    });
  }
}
