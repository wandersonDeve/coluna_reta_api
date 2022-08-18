import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repository/user.repository';

export class CreateUserService {
  async execute(data: CreateUserDto) {
    const userRepository = new UserRepository();

    const passwordHash = await bcrypt.hash(data.passwordHash, 10);

    data.passwordHash = passwordHash;

    return userRepository.createUser(data);
  }
}
