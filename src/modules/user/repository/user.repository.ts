import { PrismaClient } from '@prisma/client';

import { User } from '../entities/user.entity';
import { PageOptionsDto } from '../../../shared/pagination-dtos';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserRepository extends PrismaClient {
  async createUser({
    name,
    email,
    role,
    passwordHash,
  }: CreateUserDto): Promise<User> {
    return this.user.create({
      data: {
        name,
        email,
        role,
        passwordHash,
      },
    });
  }

  async findAllUsers({
    skip,
    order,
    orderByColumn,
    take,
  }: PageOptionsDto): Promise<User[]> {
    return this.user.findMany({
      skip,
      take,
      orderBy: {
        [orderByColumn]: order,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.user.findMany();
  }
}
