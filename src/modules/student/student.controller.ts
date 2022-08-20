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
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateStudentService,
  FindAllStudentsService,
  FindManyStudentsByParamService,
  FindOneStudentByIdService,
} from './services';
import { User } from '@prisma/client';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { SearchStudentsDto } from './dto/search-students.dto';

@ApiTags('Student')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private createStudentService: CreateStudentService,
    private findAllStudentsService: FindAllStudentsService,
    private findOneStudentByIdService: FindOneStudentByIdService,
    private findManyStudentsByParamService: FindManyStudentsByParamService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new student - (FOR ALL USERS).',
  })
  async create(@LoggedAdmin() user: User, @Body() data: CreateStudentDto) {
    return this.createStudentService.execute(data);
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Get all students - (FOR ALL USERS).',
  })
  async findAll(@LoggedAdmin() user: User, @Query() query: PageOptionsDto) {
    return this.findAllStudentsService.execute(query);
  }

  @Get('search/:id')
  @ApiOperation({
    summary: 'Get a student by id - (FOR ALL USERS).',
  })
  async findOne(@LoggedAdmin() user: User, @Param('id') id: string) {
    return this.findOneStudentByIdService.execute(+id);
  }

  @Get('/search')
  @ApiOperation({
    summary: 'Get students by any param - (FOR ALL USERS).',
  })
  async findManyStudents(
    @LoggedAdmin() user: User,
    @Body() data: SearchStudentsDto,
  ) {
    return this.findManyStudentsByParamService.execute(data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a student - (FOR ALL USERS).',
  })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a student by id - (FOR ALL USERS).',
  })
  async remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
