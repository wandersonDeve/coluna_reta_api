import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageProducer } from '../../../shared/sqs/producer/producer.service';
import { StudentRepository } from '../repository/student-repository';

@Injectable()
export class DeleteStudentByIdService {
  constructor(private messageProducer: MessageProducer) {}

  async execute(id: number) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }
    const studentRepository = new StudentRepository();

    const student = await studentRepository.findOneStudentById(id);

    if (!student) {
      await this.messageProducer.sendMessage({
        local: 'delete student',
        message: 'Student allready exist',
      });
      throw new BadRequestException('Student not exist');
    }

    return studentRepository.deleteStudentByid(id);
  }
}
