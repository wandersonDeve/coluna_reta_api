import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import { MailModule } from '../mail/mail.module';
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
import { UserController } from './user.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), MailModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    FindAllUsersServices,
    CreateUserService,
    FindOneUserService,
    SearchUsersService,
    UpdateUserService,
    DeleteUserService,
    UpdatePasswordByEmailService,
    UpdateMyAccountService,
  ],
})
export class UserModule {}
