import { Institution } from '../entities/institution.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination-dtos';
import { InstitutionRepository } from '../repository/institution.repository';

export class FindAllInstitutionsService {
  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<Institution>> {
    const institutionRepository = new InstitutionRepository();

    const institutions = await institutionRepository.findAllInstitutions(
      pageOptionsDto,
    );

    const allInstitutions = await institutionRepository.getAllInstitutions();

    const itemCount = allInstitutions.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(institutions, pageMetaDto);
  }
}
