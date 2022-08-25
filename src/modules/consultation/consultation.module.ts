import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConsultationController } from './consultation.controller';
import { CreateConsultationService } from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ConsultationController],
  providers: [CreateConsultationService],
})
export class ConsultationModule {}
