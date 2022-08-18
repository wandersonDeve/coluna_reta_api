import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Field to search users by name, role or email.',
    example: 'Charles',
  })
  search: string;
}
