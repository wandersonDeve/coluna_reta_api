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
  SetMetadata,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Student')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @SetMetadata('roles', ['admin', 'student'])
  @ApiOperation({
    summary: 'Create a new student - (FOR ADMIN/CAMPO).',
  })
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get('/all')
  async findAll(@Query() query: PageOptionsDto) {
    return this.studentService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
