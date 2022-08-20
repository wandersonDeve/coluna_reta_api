import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/shared/pagination-dtos';
import { SearchStudentsDto } from '../dto/search-students.dto';
import { StudentRepository } from '../repository/student-repository';

export class FindManyStudentsByParamService {
  async execute({ search }: SearchStudentsDto, pageOptionsDto: PageOptionsDto) {
    const studentRepository = new StudentRepository();

    const where = {
      OR: [
        {
          name: {
            contains: search,
          },
          deleted: false,
        },
        {
          birth_date: {
            contains: search,
          },
          deleted: false,
        },
        {
          phone: {
            contains: search,
          },
          deleted: false,
        },
      ],
    };

    const students = await studentRepository.findManyStudentByParam(
      where,
      pageOptionsDto,
    );

    const allStudents = await studentRepository.getAllStudents(where);

    const itemCount = allStudents.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(students, pageMetaDto);
  }
}
