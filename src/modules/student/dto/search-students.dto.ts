import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchStudentsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Field to search users by name, birth_date.',
    example: 'Jin',
  })
  search: string;
}
