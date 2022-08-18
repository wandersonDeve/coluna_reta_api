import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreateUserService, FindAllUsersServices } from './services';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    FindAllUsersServices,
    CreateUserService,
  ],
})
export class UserModule {}
