import { PageDto, PageOptionsDto } from '../dto/pagination';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

export class FindAllUsersServices {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const users = await this.userRepository.findAllUsers(pageOptionsDto);

    return users;
  }
}
