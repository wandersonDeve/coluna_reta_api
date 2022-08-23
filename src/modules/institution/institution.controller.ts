import {
  UseGuards,
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateInstitutionDto } from './dto/create-institution';
import { UpdateInstitutionDto } from './dto/update.institution';
import {
  CreateInstitutionService,
  DeleteInstitutionService,
  FindAllInstitutionsService,
  GetAllInstitutionsService,
  FindOneInstitutionService,
  UpdateInstitutionService,
} from './services';

@ApiTags('Institution')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('institution')
export class InstitutionController {
  constructor(
    private createInstitutionService: CreateInstitutionService,
    private findAllInstitutionsService: FindAllInstitutionsService,
    private getAllInstitutionsService: GetAllInstitutionsService,
    private findOneInstitutionService: FindOneInstitutionService,
    private updateInstitutionService: UpdateInstitutionService,
    private deleteInstitutionService: DeleteInstitutionService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new institution - (FOR ADMIN).',
  })
  create(
    @LoggedAdmin() user: User,
    @Body() createInstitutionDto: CreateInstitutionDto,
  ) {
    return this.createInstitutionService.execute(createInstitutionDto);
  }

  // @Get('all')
  // @ApiOperation({
  //   summary: 'List all institutions - (FOR ALL USERS).',
  // })
  // findAll(@LoggedUser() user: User, @Query() query: PageOptionsDto) {
  //   return this.findAllInstitutionsService.execute(query);
  // }

  @Get('all')
  @ApiOperation({
    summary: 'List all institutions - (FOR ALL USERS).',
  })
  findAll(@LoggedUser() user: User) {
    return this.getAllInstitutionsService.execute();
  }

  @Get('search/:institutionID')
  @ApiOperation({
    summary: 'View a institution by Id - (FOR ALL USERS).',
  })
  findOneInstitution(
    @LoggedUser() user: User,
    @Param('institutionID') institutionId: number,
  ) {
    return this.findOneInstitutionService.execute(institutionId);
  }

  @Patch('update/:institutionID')
  @ApiOperation({
    summary: 'Edit a institutions by Id - (FOR ADMIN).',
  })
  updateInstitution(
    @LoggedAdmin() user: User,
    @Param('institutionID') institutionId: number,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.updateInstitutionService.execute(
      institutionId,
      updateInstitutionDto,
    );
  }

  @Delete('delete/:institutionID')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a institution by Id - (FOR ADMIN).',
  })
  deleteInstitution(
    @LoggedAdmin() user: User,
    @Param('institutionID') institutionId: number,
  ) {
    return this.deleteInstitutionService.execute(institutionId);
  }
}
