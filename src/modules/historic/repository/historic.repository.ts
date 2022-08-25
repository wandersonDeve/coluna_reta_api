import { PrismaClient } from '@prisma/client';
import { CreateHistoricDto } from 'src/modules/historic/dto/create-historic.dto';
import { handleError } from 'src/shared/utils/handle-error.util';

export class HistoricRepository extends PrismaClient {
  async createHistoric(data: CreateHistoricDto) {
    return this.historic
      .create({
        data: {
          student: {
            connect: {
              id: data.student_id,
            },
          },
          forwarding: data.forwarding,
          cobb_angle: data.cobb_angle,
          return_date: data.return_date,
        },
        select: {
          id: true,
          student: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
          consultation_date: true,
          forwarding: true,
          cobb_angle: true,
          return_date: true
        },
      })
      .catch(handleError);
  }
}
