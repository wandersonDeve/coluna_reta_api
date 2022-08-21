import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

export class FindOneUserService {
  async execute(userId: number): Promise<User> {
    const userRepository = new UserRepository();

    return await userRepository.findOneUser(userId);
  }
}
