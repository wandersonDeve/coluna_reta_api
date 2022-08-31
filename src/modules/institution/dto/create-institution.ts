import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInstitutionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the Institution.',
    example: 'UNIP',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The phone number of the Institution.',
    example: '(11) 2090-4500',
  })
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The state of the address.',
    example: 'SP',
  })
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the city.',
    example: 'São Paulo',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The zip code of the address.',
    example: '3086-040',
  })
  zip_code: string;
}
