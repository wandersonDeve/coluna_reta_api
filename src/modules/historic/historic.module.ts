import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HistoricController } from './historic.controller';
import { CreateHistoricService } from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [HistoricController],
  providers: [CreateHistoricService],
})
export class HistoricModule {}
