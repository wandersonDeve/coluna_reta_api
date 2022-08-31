import { PartialType } from '@nestjs/swagger';
import { CreateInstitutionDto } from './create-institution';

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {}
