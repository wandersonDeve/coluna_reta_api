import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/service/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './util/roleUser';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      name: dto.name,
      role: UserRole.BACKOFICCE,
      email: dto.email,
      passwordHash: await bcrypt.hash(dto.passwordHash, 10),
    };

    return await this.prisma.user
      .create({
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

  async findAll() {
    const allUsers = await this.prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
        },
      })
      .catch(handleError);

    if (allUsers.length === 0) {
      throw new NotFoundException('No a users found');
    }

    return allUsers;
  }

  async findById(userId: number) {
    const record = await this.prisma.user
      .findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
        },
      })
      .catch(handleError);

    if (!record) {
      throw new NotFoundException(`Record with Id '${userId}' not found!`);
    }

    return record;
  }

  async findOneUser(id: number) {
    return await this.findById(id);
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    await this.findById(userId);

    const data = { ...dto };

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

  async deleteUser(id: number) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id } }).catch(handleError);
  }
}
