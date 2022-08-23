import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

export class CreateUserService {
  async execute(data: CreateUserDto): Promise<User> {
    const userRepository = new UserRepository();

    const passwordHash = await bcrypt.hash(data.passwordHash, 10);

    data.passwordHash = passwordHash;

    return userRepository.createUser(data);
  }
}
