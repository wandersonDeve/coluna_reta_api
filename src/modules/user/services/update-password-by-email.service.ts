import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreatePasswordHashDto } from '../dto/password.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

export class UpdatePasswordByEmailService {
  async execute({
    recoverPasswordToken,
    passwordHash,
    confirmPassword,
  }: CreatePasswordHashDto): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.findByToken(recoverPasswordToken);

    if (!user) {
      throw new BadRequestException(`User not found`);
    }

    if (passwordHash != confirmPassword) {
      throw new BadRequestException(`Password mismatch`);
    }
    passwordHash = await bcrypt.hash(passwordHash, 10);

    return await userRepository.updatePassword(user.id, passwordHash);
  }
}
