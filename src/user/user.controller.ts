import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user',
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List all users',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get('search/:id')
  @ApiOperation({
    summary: 'View a user by Id',
  })
  findOneUser(@Param('id') userId: number) {
    return this.userService.findOneUser(userId);
  }

  @Patch('update-user/:id')
  @ApiOperation({
    summary: 'Edit a user by id',
  })
  updateMyAccount(
    @Param('id') userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id',
  })
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
