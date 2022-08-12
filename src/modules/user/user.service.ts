import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: CreateUserDto) {
    const data: UserCreateInput = {
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
