import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination-dtos';
import { HistoricRepository } from '../repository/historic.repository';

export class FindHistoricByStudentService {
  async execute(pageOptionsDto: PageOptionsDto, studentId: number) {
    const historicRepository = new HistoricRepository();

    const historic = await historicRepository.findHistoricByStudent(
      pageOptionsDto,
      studentId,
    );

    const itemCount = historic.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(historic, pageMetaDto);
  }
}
