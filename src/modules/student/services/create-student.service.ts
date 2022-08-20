import { BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentRepository } from '../repository/student-repository';

export class CreateStudentService {
  async execute(data: CreateStudentDto) {
    const studentRepository = new StudentRepository();

    const studentAllreadyExist =
      await studentRepository.findOneStudentByAllData(data);

    if (!studentAllreadyExist) {
      throw new BadRequestException('Student allready exist');
    }

    return studentRepository.createStudent(data);
  }
}
