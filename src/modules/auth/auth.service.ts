import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/service/prisma.service';
import { handleError } from 'src/shared/utils/handle-error.util';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async LoginUser(loginUserDto: LoginUserDto) {
    const { email, passwordHash } = loginUserDto;

    const user = await this.prisma.user
      .findUnique({ where: { email } })
      .catch(handleError);

    if (!user) {
      throw new UnauthorizedException('Invalid email and/or password!');
    }

    const isHashValid = await bcrypt.compare(passwordHash, user.passwordHash);

    if (!isHashValid) {
      throw new UnauthorizedException('Invalid email and/or password!');
    }

    delete user.passwordHash;

    return {
      token: this.jwt.sign({ email }),
      user,
    };
  }
}
