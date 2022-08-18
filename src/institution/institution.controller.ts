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

  @Get('search/:institutionID')
  @ApiOperation({
    summary: 'View a Institution by Id - (FOR ADMIN).',
  })
  findOne(@LoggedAdmin() user: User, @Param('institutionID') institutionId: number) {
    return this.institutionService.findOne(institutionId);
  }

  @Patch('update/:institutionID')
  @ApiOperation({
    summary: 'Edit a Institution by Id - (FOR ADMIN).',
  })
  update(
    @LoggedAdmin() user: User,
    @Param('institutionID') id: number,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionService.update(id, updateInstitutionDto);
  }

  @Delete('delete/:institutionID')
  @ApiOperation({
    summary: 'Remove a Institution by Id - (FOR ADMIN).',
  })
  delete(@LoggedAdmin() user: User, @Param('institutionID') id: number) {
    return this.institutionService.delete(id);
  }
}
