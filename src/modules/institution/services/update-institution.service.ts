import { UpdateInstitutionDto } from '../dto/update.institution';
import { InstitutionRepository } from '../repository/institution.repository';

export class UpdateInstitutionService {
  async execute(institutionId: number, data: UpdateInstitutionDto) {
    const institutionRepository = new InstitutionRepository();

    return await institutionRepository.updateInstitution(institutionId, data);
  }
}
