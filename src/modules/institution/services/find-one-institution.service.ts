import { InstitutionRepository } from '../repository/institution.repository';

export class FindOneInstitutionService {
  async execute(institutionId: number) {
    const institutionRepository = new InstitutionRepository();

    return await institutionRepository.findOneInstitution(institutionId);
  }
}
