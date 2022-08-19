import { UserRepository } from '../repository/user.repository';

export class FindOneUserService {
  async execute(userId: number) {
    const userRepository = new UserRepository();

    return await userRepository.findOneUser(userId);
  }
}
