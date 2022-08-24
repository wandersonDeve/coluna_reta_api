import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class CreatePasswordHashDto {
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

  @IsString()
  @ApiProperty({
    description: 'User password confirmation',
    example: 'Reta12@#',
  })
  confirmPassword: string;
}
