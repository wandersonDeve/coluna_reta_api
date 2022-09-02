import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailService } from '../../../modules/mail/mail.service';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private mailService: MailService) {}

  async execute(data: CreateUserDto): Promise<string> {
    const userRepository = new UserRepository();

    const userAllreadyExists = await userRepository.findOneByEmail(data.email);

    if (userAllreadyExists) {
      throw new BadRequestException(`User ${data.email} already exists`);
    }

    data.recoverPasswordToken = crypto.randomBytes(32).toString('hex');

    const newUser = await userRepository.createUser(data);

    return this.mailService.sendUserConfirmation(newUser);
  }
}
