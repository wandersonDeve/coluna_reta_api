import { InstitutionRepository } from '../repository/institution.repository';

export class GetAllInstitutionsService {
  async execute() {
    const institutionRepository = new InstitutionRepository();

    return institutionRepository.getAllInstitutions();
  }
}
