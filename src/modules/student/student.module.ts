import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { PrismaService } from 'prisma/service/prisma.service';
import { PassportModule } from '@nestjs/passport';
import {
  CreateStudentService,
  DeleteStudentByIdService,
  FindAllStudentsService,
  FindManyStudentsByParamService,
  FindOneStudentByIdService,
  UpdateStudentService,
} from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [StudentController],
  providers: [
    PrismaService,
    CreateStudentService,
    FindAllStudentsService,
    FindOneStudentByIdService,
    FindManyStudentsByParamService,
    DeleteStudentByIdService,
    UpdateStudentService,
  ],
})
export class StudentModule {}
