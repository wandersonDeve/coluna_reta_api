import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import { InstitutionController } from './institution.controller';
import {
  CreateInstitutionService,
  DeleteInstitutionService,
  FindAllInstitutionsService,
  FindOneInstitutionService,
  UpdateInstitutionService,
} from './services';
import { GetAllInstitutionsService } from './services/get-all-institutions.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [InstitutionController],
  providers: [
    PrismaService,
    CreateInstitutionService,
    FindAllInstitutionsService,
    FindOneInstitutionService,
    GetAllInstitutionsService,
    UpdateInstitutionService,
    DeleteInstitutionService,
  ],
})
export class InstitutionModule {}
