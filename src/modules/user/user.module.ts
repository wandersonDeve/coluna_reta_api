import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersServices,
  FindOneUserService,
  SearchUsersService,
  UpdateUserService,
} from './services';
import { UserController } from './user.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [
    PrismaService,
    FindAllUsersServices,
    CreateUserService,
    FindOneUserService,
    SearchUsersService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
