import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateStudentService,
  DeleteStudentByIdService,
  FindAllStudentsService,
  FindManyStudentsByParamService,
  FindOneStudentByIdService,
  UpdateStudentService,
} from './services';
import { User } from '@prisma/client';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { SearchStudentsDto } from './dto/search-students.dto';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateQueryDto } from './dto/create-query.dto';
import { CreateQueryService } from './services/create-query.service';

@ApiTags('Student')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(
    private createStudentService: CreateStudentService,
    private findAllStudentsService: FindAllStudentsService,
    private findOneStudentByIdService: FindOneStudentByIdService,
    private findManyStudentsByParamService: FindManyStudentsByParamService,
    private deleteStudentByIdService: DeleteStudentByIdService,
    private updateStudentService: UpdateStudentService,
    private createQueryService: CreateQueryService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new student - (FOR ADMIN).',
  })
  async create(@LoggedAdmin() user: User, @Body() data: CreateStudentDto) {
    return this.createStudentService.execute(data);
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Get all students - (FOR ALL USERS).',
  })
  async findAll(@LoggedUser() user: User, @Query() query: PageOptionsDto) {
    return this.findAllStudentsService.execute(query);
  }

  @Get('search/:id')
  @ApiOperation({
    summary: 'Get a student by id - (FOR ALL USERS).',
  })
  async findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.findOneStudentByIdService.execute(+id);
  }

  @Post('/search')
  @ApiOperation({
    summary: 'Get students by any param - (FOR ALL USERS).',
  })
  async findManyStudents(
    @LoggedUser() user: User,
    @Body() data: SearchStudentsDto,
    @Query() query: PageOptionsDto,
  ) {
    return this.findManyStudentsByParamService.execute(data, query);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a student - (FOR ADMIN).',
  })
  async update(
    @LoggedAdmin() user: User,
    @Param('id') id: string,
    @Body() data: UpdateStudentDto,
  ) {
    return this.updateStudentService.execute(+id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a student by id - (FOR ADMIN).',
  })
  async remove(@LoggedAdmin() user: User, @Param('id') id: string) {
    return this.deleteStudentByIdService.execute(+id);
  }

  @Post('/query')
  @ApiOperation({
    summary: 'Create a new query for student - (FOR USERS).',
  })
  async createQuery(@LoggedUser() user: User, @Body() data: CreateQueryDto) {
    return this.createQueryService.execute(data);
  }
}
