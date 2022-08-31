import {
  PageOptionsDto,
  PageDto,
  PageMetaDto,
} from '../../../shared/pagination-dtos';
import { Student } from '../entities/student.entity';
import { StudentRepository } from '../repository/student-repository';

export class FindAllStudentsService {
  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<Student>> {
    const studentRepository = new StudentRepository();

    const users = await studentRepository.findAllStudents(pageOptionsDto);

    const allUsers = await studentRepository.getAllStudents({
      deleted: false,
    });

    const itemCount = allUsers.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(users, pageMetaDto);
  }
}
