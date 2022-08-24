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
import { CreateQueryService } from './services/create-query.service';

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
    CreateQueryService
  ],
})
export class StudentModule {}
