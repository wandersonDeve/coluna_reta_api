import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination-dtos';
import { SearchUserDto } from '../dto/search.dto';
import { UserRepository } from '../repository/user.repository';

export class SearchUsersService {
  async execute(pageOptionsDto: PageOptionsDto, searchUserDto: SearchUserDto) {
    const userRepository = new UserRepository();

    const users = await userRepository.searchUsers(
      pageOptionsDto,
      searchUserDto,
    );

    const allUsers = await userRepository.getAllUsers();

    const itemCount = allUsers.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(users, pageMetaDto);
  }
}
