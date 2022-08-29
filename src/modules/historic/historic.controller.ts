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
import { LoggedUser } from 'src/modules/auth/decorator/logged-user.decorator';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { CreateHistoricDto } from './dto/create-historic.dto';
import {
  CreateHistoricService,
  FindHistoricByStudentService,
} from './services';
import { GeneratePdfService } from './services/generate-pdf.service';

@ApiTags('Historic')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('historic')
export class HistoricController {
  constructor(
    private createhistoricService: CreateHistoricService,
    private findHistoricByStudentService: FindHistoricByStudentService,
    private generatePdfService: GeneratePdfService,
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

  @Post('/pdf')
  @ApiOperation({
    summary: 'Create a PDF file.',
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
}
