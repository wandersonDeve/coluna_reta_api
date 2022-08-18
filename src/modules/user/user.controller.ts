import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedAdmin } from 'src/auth/logged-admin.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserService, FindAllUsersServices } from './services';
import { PageOptionsDto } from '../../shared/pagination-dtos';

@ApiTags('user')
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private findAllUsersServices: FindAllUsersServices,
    private createUserService: CreateUserService,
  ) {}

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
  findAll(@LoggedAdmin() user: User, @Query() query: PageOptionsDto) {
    return this.findAllUsersServices.execute(query);
  }

  @Get('search/:userId')
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

  @Patch('update/:userId')
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

  @Delete('delete/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id - (FOR ADMIN).',
  })
  deleteUser(@LoggedAdmin() user: User, @Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
