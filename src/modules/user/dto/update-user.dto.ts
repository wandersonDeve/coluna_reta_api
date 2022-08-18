import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../util/roleUser';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @IsEnum(UserRole)
  @ApiProperty({
    description: 'Role of the user available on the platform.',
    example: UserRole.ADMIN,
  })
  role: UserRole;
}
