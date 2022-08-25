import { PrismaClient } from '@prisma/client';
import { CreateConsultationDto } from 'src/modules/consultation/dto/create-consultation.dto';
import { handleError } from 'src/shared/utils/handle-error.util';

export class ConsultationRepository extends PrismaClient {
  async createConsultation(data: CreateConsultationDto) {
    return this.consultation
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
