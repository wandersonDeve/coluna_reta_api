import { CreateInstitutionDto } from '../dto/create-institution';
import { InstitutionRepository } from '../repository/institution.repository';

export class CreateInstitutionService {
  async execute(data: CreateInstitutionDto) {
    const institutionRepository = new InstitutionRepository();

    return institutionRepository.createInstitution(data);
  }
}
