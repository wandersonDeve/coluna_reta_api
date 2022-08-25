import {
  UseGuards,
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/modules/auth/decorator/logged-user.decorator';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { CreateHistoricDto } from './dto/create-historic.dto';
import {
  CreateHistoricService,
  FindHistoricByStudentService,
} from './services';

@ApiTags('Historic')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('historic')
export class HistoricController {
  constructor(
    private createhistoricService: CreateHistoricService,
    private findHistoricByStudentService: FindHistoricByStudentService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a historic for student - (FOR USERS).',
  })
  async createHistoric(
    @LoggedUser() user: User,
    @Body() data: CreateHistoricDto,
  ) {
    return this.createhistoricService.execute(data);
  }

  @Get('find/:studentID')
  @ApiOperation({
    summary: 'Find a historic by student - (FOR USERS).',
  })
  async findHistoricByStudent(
    @LoggedUser() user: User,
    @Query() query: PageOptionsDto,
    @Param('studentID') studentId: number,
  ) {
    return this.findHistoricByStudentService.execute(query, studentId);
  }
}
