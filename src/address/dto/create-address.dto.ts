import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../entities/address.entity';

export class CreateAddressDto extends Address {
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
    description: 'The address complement.',
    example: 'Near the São Jorge Park',
  })
  complement: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The neighborhood of the address.',
    example: 'Tatuapé',
  })
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The house number.',
    example: '505',
  })
  number: string;

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
    description: 'The strate of the address.',
    example: 'Antônio Macedo Street',
  })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The zip code of the address.',
    example: '3086-040',
  })
  zip_code: string;
}
