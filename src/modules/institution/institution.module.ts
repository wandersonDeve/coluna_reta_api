import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import { InstitutionController } from './institution.controller';
import {
  CreateInstitutionService,
  DeleteInstitutionService,
  FindAllInstitutionsServices,
  FindOneInstitutionService,
  UpdateInstitutionService,
} from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [InstitutionController],
  providers: [
    PrismaService,
    CreateInstitutionService,
    FindAllInstitutionsServices,
    FindOneInstitutionService,
    UpdateInstitutionService,
    DeleteInstitutionService,
  ],
})
export class InstitutionModule {}
