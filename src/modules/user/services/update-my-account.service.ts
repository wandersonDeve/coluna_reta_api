import { UpdateMyAccountDto } from '../dto/update-my-account.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

export class UpdateMyAccountService {
  async execute(userId: number, data: UpdateMyAccountDto): Promise<User> {
    const userRepository = new UserRepository();

    return await userRepository.updateMyAccount(userId, data);
  }
}
