import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InstitutionService } from './institution.service';

@ApiTags('Institution')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new Instituition - (FOR ADMIN).',
  })
  create(
    @LoggedAdmin() user: User,
    @Body() createInstitutionDto: CreateInstitutionDto,
  ) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List all Instituitions - (FOR ADMIN).',
  })
  findAll(@LoggedAdmin() user: User) {
    return this.institutionService.findAll();
  }

  @Get('search/:id')
  @ApiOperation({
    summary: 'View a institution by Id - (FOR ADMIN).',
  })
  findOne(@Param('id') institutionId: string) {
    return this.institutionService.findOne(+institutionId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.institutionService.remove(id);
  }
}
