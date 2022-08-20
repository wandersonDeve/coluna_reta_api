import { SearchStudentsDto } from '../dto/search-students.dto';
import { StudentRepository } from '../repository/student-repository';

export class FindManyStudentsByParamService {
  async execute({ search }: SearchStudentsDto) {
    const studentRepository = new StudentRepository();

    return await studentRepository.findManyStudentByParam(search);
  }
}
