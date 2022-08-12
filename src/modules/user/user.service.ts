import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      name: dto.name,
      role: dto.role,
      email: dto.email,
      passwordHash: await bcrypt.hash(dto.passwordHash, 10),
    };

    return await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        role: true,
      },
    });
  }
}
