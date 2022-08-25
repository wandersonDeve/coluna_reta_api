import { HistoricRepository } from 'src/modules/historic/repository/historic.repository';
import { CreateHistoricDto } from '../dto/create-historic.dto';

export class CreateHistoricService {
  async execute(data: CreateHistoricDto) {
    const historicRepository = new HistoricRepository();

    return historicRepository.createHistoric(data);
  }
}
