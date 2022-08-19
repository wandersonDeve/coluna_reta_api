import { SearchUserDto } from '../dto/search.dto';
import { UserRepository } from '../repository/user.repository';

export class SearchUsersService {
  async execute(searchUserDto: SearchUserDto) {
    const userRepository = new UserRepository();

    return await userRepository.searchUsers(searchUserDto);
  }
}
