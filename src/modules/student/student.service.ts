import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: {
        id,
      },
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
