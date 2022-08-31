import {
  UseGuards,
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from '../../modules/auth/decorator/logged-user.decorator';
import { PageOptionsDto } from '../../shared/pagination-dtos';
import { CreateHistoricDto } from './dto/create-historic.dto';
import {
  CreateConsultationService,
  CreateHistoricService,
  FindHistoricByStudentService,
} from './services';
import { GeneratePdfService } from './services/generate-pdf.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';

@ApiTags('Historic')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('historic')
export class HistoricController {
  constructor(
    private createhistoricService: CreateHistoricService,
    private findHistoricByStudentService: FindHistoricByStudentService,
    private generatePdfService: GeneratePdfService,
    private createConsultationService: CreateConsultationService,
  ) {}

  @Post('register-visit')
  @ApiOperation({
    summary: 'Register a student visit - (FOR USERS).',
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

  @Post('pdf')
  @ApiOperation({
    summary: 'Create a PDF file. - (FOR USERS).',
  })
  async getPDF(
    @LoggedUser() user: User,
    @Body() data: any,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.generatePdfService.execute(data.ids);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${Date.now()}.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Post('make-appointment')
  @ApiOperation({
    summary: 'Make an appointment for a student. - (FOR USERS).',
  })
  async createConsultation(
    @LoggedUser() user: User,
    @Body() data: CreateConsultationDto,
  ) {
    return this.createConsultationService.execute(data);
  }
}
