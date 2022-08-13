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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { User } from './entities/user.entity';


@ApiTags('user')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user - (FOR ADMIN).',
  })
  create(@LoggedAdmin() user: User, @Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List all users - (FOR ADMIN).',
  })
  findAll(@LoggedAdmin() user: User) {
    return this.userService.findAll();
  }

  @Get('search/:id')
  @ApiOperation({
    summary: 'View a user by Id - (FOR ADMIN).',
  })
  findOneUser(@LoggedAdmin() user: User, @Param('id') userId: number) {
    return this.userService.findOneUser(userId);
  }

  @Patch('update-user/:id')
  @ApiOperation({
    summary: 'Edit a user by id - (FOR ADMIN).',
  })
  updateUser(
    @LoggedAdmin() user: User,
    @Param('id') userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }

  @Patch('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id - (FOR ADMIN).',
  })
  deleteUser(@LoggedAdmin() user: User, @Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
