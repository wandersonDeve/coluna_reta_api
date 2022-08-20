import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { PageOptionsDto } from '../../../shared/pagination-dtos';
import { CreateUserDto } from '../dto/create-user.dto';
import { SearchUserDto } from '../dto/search.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export class UserRepository extends PrismaClient {
  async createUser({
    name,
    email,
    role,
    passwordHash,
  }: CreateUserDto): Promise<User> {
    return this.user
      .create({
        data: {
          name,
          email,
          role,
          passwordHash,
        },
      })
      .catch(handleError);
  }

  async findAllUsers({
    skip,
    order,
    orderByColumn,
    take,
  }: PageOptionsDto): Promise<User[]> {
    const users = await this.user
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
        where: { deleted: false },
      })
      .catch(handleError);

    if (users.length === 0) {
      throw new NotFoundException('No a users found');
    }

    return users;
  }

  async getAllUsers(): Promise<User[]> {
    return this.user
      .findMany({
        where: {
          deleted: false,
        },
      })
      .catch(handleError);
  }

  async findOneUser(userId: number) {
    const user = await this.user
      .findFirst({
        where: { id: userId, deleted: false },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          deleted: false,
        },
      })
      .catch(handleError);

    if (!user) {
      throw new NotFoundException(`User with Id '${userId}' not found!`);
    }

    return user;
  }

  async searchUsers(searchUserDto: SearchUserDto) {
    return this.user
      .findMany({
        orderBy: [
          {
            name: 'asc',
          },
        ],
        where: {
          OR: [
            {
              name: {
                contains: searchUserDto.search,
              },
            },
            {
              role: {
                contains: searchUserDto.search,
              },
            },
            {
              email: {
                contains: searchUserDto.search,
              },
            },
            {
              deleted: false,
            },
          ],
        },
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
      })
      .catch(handleError);
  }

  async updateUser(userId: number, { ...data }: UpdateUserDto) {
    const user = await this.findOneUser(userId);

    return await this.user
      .update({
        where: { id: userId },
        data,
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
      })
      .catch(handleError);
  }

  async deleteUser(userId: number) {
    const user = await this.findOneUser(userId);

    return await this.user
      .update({
        where: { id: userId },
        data: {
          deleted: true,
        },
      })
      .catch(handleError);
  }
}
