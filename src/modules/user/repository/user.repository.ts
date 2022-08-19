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
    return this.user
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
        where: { deleted: false },
      })
      .catch(handleError);
  }

  async getAllUsers(): Promise<User[]> {
    return this.user.findMany().catch(handleError);
  }

  async findOneUser(userId: number) {
    return await this.user
      .findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          deleted: true,
        },
      })
      .catch(handleError);
  }

  async searchUsers(searchUserDto: SearchUserDto) {
    return await this.user
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
                contains: searchUserDto.search
              },
            },
            {
              role: {
                contains: searchUserDto.search
              },
            },
            {
              email: {
                contains: searchUserDto.search
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
          deleted: true,
        },
      })
      .catch(handleError);
  }

  async updateUser(userId: number, { ...data }: UpdateUserDto) {
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
