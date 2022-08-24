import { QueryStudentRepository } from 'src/modules/queryStudent/repository/queryStudent.repository';
import { CreateQueryDto } from '../dto/create-query.dto';

export class CreateQueryService {
  async execute(data: CreateQueryDto) {
    const queryStudentRepository = new QueryStudentRepository();

    return queryStudentRepository.createQuery(data);
  }
}
