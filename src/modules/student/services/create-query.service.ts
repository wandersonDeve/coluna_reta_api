import { CreateQueryDto } from '../dto/create-query.dto';
import { StudentRepository } from '../repository/student-repository';

export class CreateQueryService {
  async execute(data: CreateQueryDto) {
    const studentRepository = new StudentRepository();

    return studentRepository.createQuery(data);
  }
}
