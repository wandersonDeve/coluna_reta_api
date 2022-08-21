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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../shared/pagination-dtos';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersServices,
  FindOneUserService,
  SearchUsersService,
  UpdateUserService,
} from './services';

@ApiTags('User')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private findAllUsersServices: FindAllUsersServices,
    private createUserService: CreateUserService,
    private findOneUserService: FindOneUserService,
    private searchUsersService: SearchUsersService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new user - (FOR ADMIN).',
  })
  create(@LoggedAdmin() user: User, @Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserService.execute(createUserDto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List all users - (FOR ADMIN).',
  })
  findAll(@LoggedAdmin() user: User, @Query() query: PageOptionsDto) {
    return this.findAllUsersServices.execute(query);
  }

  @Get('search/:userID')
  @ApiOperation({
    summary: 'View a user by Id - (FOR ADMIN).',
  })
  findOneUser(@LoggedAdmin() user: User, @Param('userID') userId: number) {
    return this.findOneUserService.execute(userId);
  }

  @Post('/search')
  @ApiOperation({
    summary: `View a user by name, role or email - (FOR ADMIN).`,
  })
  @HttpCode(HttpStatus.OK)
  searchUsers(
    @LoggedAdmin() user: User,
    @Query() query: PageOptionsDto,
    @Body() searchUserDto: SearchUserDto,
  ) {
    return this.searchUsersService.execute(query, searchUserDto);
  }

  @Patch('update/:userID')
  @ApiOperation({
    summary: 'Edit a user by Id - (FOR ALL USERS).',
  })
  updateUser(
    @LoggedAdmin() user: User,
    @Param('userID') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserService.execute(userId, updateUserDto);
  }

  @Delete('delete/:userID')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id - (FOR ADMIN).',
  })
  deleteUser(@LoggedAdmin() user: User, @Param('userID') userId: number): Promise<object> {
    return this.deleteUserService.execute(userId);
  }
}
