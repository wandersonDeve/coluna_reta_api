import { ConsultationRepository } from 'src/modules/consultation/repository/consultationStudent.repository';
import { CreateConsultationDto } from '../dto/create-consultation.dto';

export class CreateConsultationService {
  async execute(data: CreateConsultationDto) {
    const consultationRepository = new ConsultationRepository();

    return consultationRepository.createConsultation(data);
  }
}
