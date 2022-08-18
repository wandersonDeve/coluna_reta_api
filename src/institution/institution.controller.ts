import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { LoggedUser } from 'src/auth/logged-user.decorator';

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

  @Get('search/:institutiond')
  @ApiOperation({
    summary: 'View a institution by Id - (FOR ADMIN).',
  })
  findOne(@LoggedAdmin() user: User, @Param('id') institutionId: number) {
    return this.institutionService.findOne(institutionId);
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
