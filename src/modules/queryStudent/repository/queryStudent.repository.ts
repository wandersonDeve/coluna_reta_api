import { PrismaClient } from '@prisma/client';
import { CreateQueryDto } from 'src/modules/queryStudent/dto/create-query.dto';
import { handleError } from 'src/shared/utils/handle-error.util';

export class QueryStudentRepository extends PrismaClient {
  async createQuery(data: CreateQueryDto) {
    return this.queryStudent
      .create({
        data: {
          student: {
            connect: {
              id: data.student_id,
            },
          },
          consultation_date: data.consultation_date,
          forwarding: data.forwarding,
          cobb_angle: data.cobb_angle,
          return_date: data.return_date,
        },
      })
      .catch(handleError);
  }
}
