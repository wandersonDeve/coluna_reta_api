import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreateUserService, FindAllUsersServices } from './services';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    FindAllUsersServices,
    CreateUserService,
  ],
})
export class UserModule {}
