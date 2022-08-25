import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchStudentsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Field to search by student name.',
    example: 'Saitama',
  })
  search: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description:
      'Field to filter the search by student name by institution name.',
    example: 'One Punch Man',
  })
  filter: string;
}
