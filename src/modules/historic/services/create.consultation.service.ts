import { CreateConsultationDto } from '../dto/create-consultation.dto';
import { HistoricRepository } from '../repository/historic.repository';

export class CreateConsultationService {
  async execute(data: CreateConsultationDto) {
    const historicRepository = new HistoricRepository();

    return await historicRepository.createConsultation(data);
  }
}
