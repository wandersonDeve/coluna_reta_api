import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HistoricController } from './historic.controller';
import { HistoricRepository } from './repository/historic.repository';
import {
  CreateHistoricService,
  FindHistoricByStudentService,
} from './services';
import { GeneratePdfService } from './services/generate-pdf.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HistoricController],
  providers: [
    CreateHistoricService,
    FindHistoricByStudentService,
    GeneratePdfService,
    HistoricRepository,
  ],
})
export class HistoricModule {}
