import { UserRepository } from '../repository/user.repository';

export class DeleteUserService {
  async execute(userId: number): Promise<object> {
    const userRepository = new UserRepository();

    const user = await userRepository.findOneUser(userId);

    return await userRepository.deleteUser(userId);
  }
}
