import { Injectable } from '@nestjs/common';
import {
  PageOptionsDto,
  PageDto,
  PageMetaDto,
} from '../../../shared/pagination-dtos';
import { MessageProducer } from '../../../shared/sqs/producer/producer.service';
import { Student } from '../entities/student.entity';
import { StudentRepository } from '../repository/student-repository';

@Injectable()
export class FindAllStudentsService {
  constructor(private messageProducer: MessageProducer) {}

  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<Student>> {
    const studentRepository = new StudentRepository();

    const users = await studentRepository.findAllStudents(pageOptionsDto);

    if (!users) {
      await this.messageProducer.sendMessage({
        local: 'Find all student',
        message: 'No students found',
      });
    }

    const allUsers = await studentRepository.getAllStudents({
      deleted: false,
    });

    const itemCount = allUsers.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(users, pageMetaDto);
  }
}
