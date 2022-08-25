import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HistoricController } from './historic.controller';
import { CreateHistoricService, FindHistoricByStudentService } from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HistoricController],
  providers: [CreateHistoricService, FindHistoricByStudentService],
})
export class HistoricModule {}
