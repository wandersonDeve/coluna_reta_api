import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

export class UpdateUserService {
  async execute(userID: number, data: UpdateUserDto): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.findOneUser(userID);

    if (data.passwordHash) {
      data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
    }

    return await userRepository.updateUser(userID, data);
  }
}
