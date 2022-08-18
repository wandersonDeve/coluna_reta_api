import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/service/prisma.service';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './util/roleUser';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: number) {
    const record = await this.prisma.user
      .findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
          deleted: false,
        },
      })
      .catch(handleError);

    if (!record) {
      throw new NotFoundException(`Record with Id '${userId}' not found!`);
    }

    return record;
  }

  async findOneUser(userId: number) {
    return await this.findById(userId);
  }

  async searchUsers(searchUserDto: SearchUserDto) {
    const users = await this.prisma.user
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
                startsWith: searchUserDto.search,
              },
            },
            {
              role: {
                startsWith: searchUserDto.search,
              },
            },
            {
              email: {
                startsWith: searchUserDto.search,
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
          deleted: false,
        },
      })
      .catch(handleError);

    if (users.length === 0) {
      throw new NotFoundException('Nothing was found');
    }

    return [{ users }];
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    await this.findById(userId);

    const data = { ...updateUserDto };

    if (data.passwordHash) {
      data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
    }

    return await this.prisma.user
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
    await this.findById(userId);
    await this.prisma.user
      .update({
        where: { id: userId },
        data: {
          deleted: true,
        },
      })
      .catch(handleError);
  }
}
