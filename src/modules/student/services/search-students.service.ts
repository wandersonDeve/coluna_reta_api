import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination-dtos';
import { SearchStudentsDto } from '../dto/search-students.dto';
import { StudentRepository } from '../repository/student-repository';

export class FindManyStudentsByParamService {
  async execute(data: SearchStudentsDto, pageOptionsDto: PageOptionsDto) {
    const studentRepository = new StudentRepository();

    const where = {
      name: {
        contains: data.search,
      },
      deleted: false,
      OR: {
        institution: {
          is: {
            name: {
              contains: data.filter,
            },
            deleted: false,
            AND: {
              student: {
                some: {
                  name: {
                    contains: data.search,
                  },
                  deleted: false,
                },
              },
            },
          },
        },
      },
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
