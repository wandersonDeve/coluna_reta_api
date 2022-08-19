import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';

export class UpdateUserService {
  async execute(userID: number, data: UpdateUserDto) {
    const userRepository = new UserRepository();

    if (data.passwordHash) {
      data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
    }

    return await userRepository.updateUser(userID, data);
  }
}
