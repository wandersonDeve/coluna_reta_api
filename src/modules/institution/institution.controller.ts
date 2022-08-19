import { UseGuards, Controller, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { User } from '../user/entities/user.entity';
import { CreateInstitutionDto } from './dto/create-institution';
import { CreateInstitutionService } from './services/create-institution.service';

@ApiTags('Institution')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('institution')
export class InstitutionController {
  constructor(private createInstitutionService: CreateInstitutionService) {}

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
}
