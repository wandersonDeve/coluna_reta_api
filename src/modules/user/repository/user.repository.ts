import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { PageOptionsDto } from '../../../shared/pagination-dtos';
import { CreateUserDto } from '../dto/create-user.dto';
import { SearchUserDto } from '../dto/search.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export class UserRepository extends PrismaClient {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    passwordHash: false,
    deleted: false,
    institutions: true,
  };
  async createUser({
    name,
    email,
    role,
    institution_id,
    recoverPasswordToken,
  }: CreateUserDto) {
    const newUser = await this.user
      .create({
        data: {
          name,
          email,
          role,
          recoverPasswordToken,
          institutions: {
            connect: institution_id.map((id) => ({
              id,
            })),
          },
        },
      })
      .catch(handleError);

    delete newUser.passwordHash;

    delete newUser.deleted;

    return newUser;
  }

  async findAllUsers({ skip, order, orderByColumn, take }: PageOptionsDto) {
    const users = await this.user
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
        where: { deleted: false },
        select: this.userSelect,
      })
      .catch(handleError);

    if (users.length === 0) {
      throw new NotFoundException('No a users found');
    }

    return users;
  }

  async getAllUsers() {
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
        include: {
          institutions: true,
        },
      })
      .catch(handleError);

    if (!user) {
      throw new NotFoundException(`User with Id '${userId}' not found!`);
    }

    delete user.passwordHash;

    delete user.deleted;

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findByToken(token: string): Promise<User> {
    return this.user.findFirst({
      where: {
        recoverPasswordToken: token,
      },
    });
  }

  async searchUsers(
    { skip, order, orderByColumn, take }: PageOptionsDto,
    searchUserDto: SearchUserDto,
  ) {
    return this.user
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
        where: {
          OR: [
            {
              name: {
                contains: searchUserDto.search,
              },
              deleted: false,
            },
            {
              role: {
                contains: searchUserDto.search,
              },
              deleted: false,
            },
            {
              email: {
                contains: searchUserDto.search,
              },
              deleted: false,
            },
          ],
        },
      })
      .catch(handleError);
  }

  async updateUser(userId: number, { ...data }: UpdateUserDto): Promise<User> {
    const updatedUser = await this.user
      .update({
        where: { id: userId },
        data,
      })
      .catch(handleError);

    delete updatedUser.passwordHash;
    delete updatedUser.deleted;

    return updatedUser;
  }

  async updatePassword(id: number, passwordHash: string): Promise<User> {
    const updatedUser = await this.user.update({
      where: {
        id,
      },
      data: {
        recoverPasswordToken: null,
        passwordHash,
      },
    });

    delete updatedUser.passwordHash;

    return updatedUser;
  }

  async deleteUser(userId: number): Promise<object> {
    await this.user
      .update({
        where: { id: userId },
        data: {
          deleted: true,
        },
      })
      .catch(handleError);

    return { message: 'User deleted successfully' };
  }
}
