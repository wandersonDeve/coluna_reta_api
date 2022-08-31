import { InstitutionRepository } from '../repository/institution.repository';

export class DeleteInstitutionService {
  async execute(institutionId: number) {
    const institutionRepository = new InstitutionRepository();

    return await institutionRepository.deleteInstitution(institutionId);
  }
}
