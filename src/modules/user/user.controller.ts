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
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePasswordHashDto } from './dto/password.dto';
import { SearchUserDto } from './dto/search.dto';
import { UpdateMyAccountDto } from './dto/update-my-account.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersServices,
  FindOneUserService,
  SearchUsersService,
  UpdatePasswordByEmailService,
  UpdateUserService,
  UpdateMyAccountService,
} from './services';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private findAllUsersServices: FindAllUsersServices,
    private createUserService: CreateUserService,
    private findOneUserService: FindOneUserService,
    private searchUsersService: SearchUsersService,
    private updateUserService: UpdateUserService,
    private deleteUserService: DeleteUserService,
    private updatePasswordByEmailService: UpdatePasswordByEmailService,
    private updateMyAccountService: UpdateMyAccountService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new user - (FOR ADMIN).',
  })
  create(
    @LoggedAdmin() user: User,
    @Body() createUserDto: CreateUserDto,
  ): Promise<string> {
    return this.createUserService.execute(createUserDto);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all users - (FOR ADMIN).',
  })
  findAll(@LoggedAdmin() user: User, @Query() query: PageOptionsDto) {
    return this.findAllUsersServices.execute(query);
  }

  @Get('search/:userID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'View a user by Id - (FOR ADMIN).',
  })
  findOneUser(@LoggedAdmin() user: User, @Param('userID') userId: number) {
    return this.findOneUserService.execute(userId);
  }

  @Post('/search')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit a user by Id - (FOR ADMIN).',
  })
  updateUser(
    @LoggedAdmin() user: User,
    @Param('userID') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserService.execute(userId, updateUserDto);
  }

  @Patch('update-my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Edit a user logged - (FOR ALL USERS).',
  })
  updateMyAccount(
    @LoggedUser() user: User,
    @Body() updateMyAccountDto: UpdateMyAccountDto,
  ) {
    return this.updateMyAccountService.execute(user.id, updateMyAccountDto);
  }

  @Patch('update_password')
  @ApiOperation({
    summary: 'User update password- (FOR ALL USERS).',
  })
  updatePassword(@Body() updatePassword: CreatePasswordHashDto): Promise<User> {
    return this.updatePasswordByEmailService.execute(updatePassword);
  }

  @Delete('delete/:userID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove a user by Id - (FOR ADMIN).',
  })
  deleteUser(
    @LoggedAdmin() user: User,
    @Param('userID') userId: number,
  ): Promise<object> {
    return this.deleteUserService.execute(userId);
  }
}
