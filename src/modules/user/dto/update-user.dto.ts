import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, Length, Matches } from 'class-validator';
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

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'The password of the user.',
    example: 'Reta12@#',
  })
  passwordHash: string;
}
