import { UserRepository } from '../repository/user.repository';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination-dtos';

export class FindAllUsersServices {
  async execute(pageOptionsDto: PageOptionsDto) {
    const userRepository = new UserRepository();

    const users = await userRepository.findAllUsers(pageOptionsDto);

    const allUsers = await userRepository.getAllUsers();

    const itemCount = allUsers.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(users, pageMetaDto);
  }
}
