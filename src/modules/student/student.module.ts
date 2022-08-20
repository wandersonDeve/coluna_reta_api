import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'prisma/service/prisma.service';
import { PassportModule } from '@nestjs/passport';
import {
  CreateStudentService,
  FindAllStudentsService,
  FindManyStudentsByParamService,
  FindOneStudentByIdService,
} from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [StudentController],
  providers: [
    StudentService,
    PrismaService,
    CreateStudentService,
    FindAllStudentsService,
    FindOneStudentByIdService,
    FindManyStudentsByParamService,
  ],
})
export class StudentModule {}
