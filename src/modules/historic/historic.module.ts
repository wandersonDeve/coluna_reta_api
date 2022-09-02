import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HistoricController } from './historic.controller';
import { HistoricRepository } from './repository/historic.repository';
import {
  CreateConsultationService,
  CreateHistoricService,
  FindHistoricByStudentService,
} from './services';
import { GeneratePdfFileService } from './services/create-teste-pdf.service';
import { GeneratePdfService } from './services/generate-pdf.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HistoricController],
  providers: [
    CreateHistoricService,
    FindHistoricByStudentService,
    GeneratePdfService,
    CreateConsultationService,
    HistoricRepository,
    GeneratePdfFileService,
  ],
})
export class HistoricModule {}
