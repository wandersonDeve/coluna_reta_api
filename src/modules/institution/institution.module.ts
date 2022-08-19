import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import { InstitutionController } from './institution.controller';
import { CreateInstitutionService } from './services/create-institution.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [InstitutionController],
  providers: [PrismaService, CreateInstitutionService],
})
export class InstitutionModule {}
