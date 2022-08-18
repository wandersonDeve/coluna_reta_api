import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user - (FOR ADMIN).',
  })
  create(@LoggedAdmin() user: User, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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

  @Post('/search')
  @ApiOperation({
    summary: `View a user by name, role or email - (FOR ADMIN).`,
  })
  @HttpCode(HttpStatus.OK)
  searchUsers(@LoggedAdmin() user: User, @Body() searchUserDto: SearchUserDto) {
    return this.userService.searchUsers(searchUserDto);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Edit a user by Id - (FOR ADMIN).',
  })
  updateUser(
    @LoggedAdmin() user: User,
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id - (FOR ADMIN).',
  })
  deleteUser(@LoggedAdmin() user: User, @Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
