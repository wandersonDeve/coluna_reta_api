import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/shared/pagination-dtos';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentDto) {
    return this.prisma.student.create({
      data,
    });
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Student>> {
    const { skip, take, order, orderByColumn } = pageOptionsDto;

    const students = await this.prisma.student.findMany({
      skip,
      take,
      orderBy: {
        [orderByColumn]: order,
      },
    });

    const allStudents = await this.prisma.student.findMany();

    const itemCount = allStudents.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(students, pageMetaDto);
  }

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
