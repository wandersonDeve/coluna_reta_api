import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageProducer } from '../../../shared/sqs/producer/producer.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentRepository } from '../repository/student-repository';

@Injectable()
export class CreateStudentService {
  constructor(private messageProducer: MessageProducer) {}

  async execute(data: CreateStudentDto) {
    const studentRepository = new StudentRepository();

    const studentAllreadyExist =
      await studentRepository.findOneStudentByAllData(data);

    if (studentAllreadyExist) {
      await this.messageProducer.sendMessage({
        local: 'Create student',
        message: 'Student allready exist',
      });
      throw new BadRequestException('Student allready exist');
    }

    return studentRepository.createStudent(data);
  }
}
