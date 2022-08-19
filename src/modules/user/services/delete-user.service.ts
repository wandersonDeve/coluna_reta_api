import { UserRepository } from '../repository/user.repository';

export class DeleteUserService {
  async execute(userId: number) {
    const userRepository = new UserRepository();

    return await userRepository.deleteUser(userId);
  }
}
