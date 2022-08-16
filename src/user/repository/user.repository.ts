import { PrismaClient } from '@prisma/client';
import { User } from '../entities/user.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from '../dto/pagination';

export class UserRepository extends PrismaClient {
  async findAllUsers(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const { skip, take, order, orderByColumn } = pageOptionsDto;

    const users = await this.user.findMany({
      skip,
      take,
      orderBy: {
        [orderByColumn]: order,
      },
    });

    const allUsers = await this.user.findMany();

    const itemCount = allUsers.length;

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(users, pageMetaDto);
  }
}
