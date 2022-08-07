import { Body, Controller, Post } from '@nestjs/common';
import { SaveUserDto } from '../dtos/save-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Post()
  async save(@Body() body: SaveUserDto) {
    return this.userService.save(body)
  }
}
