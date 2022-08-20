import { BadRequestException } from '@nestjs/common';
import { StudentRepository } from '../repository/student-repository';

export class DeleteStudentByIdService {
  async execute(id: number) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }
    const studentRepository = new StudentRepository();

    const student = await studentRepository.findOneStudentById(id);

    if (!student) {
      throw new BadRequestException('Student not exist');
    }

    return studentRepository.deleteStudentByid(id);
  }
}
