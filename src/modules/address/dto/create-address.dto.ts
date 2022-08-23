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
    example: 'Near the UNIP Tatuapé',
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
    example: '15',
  })
  number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The state of the address.',
    example: 'São Paulo',
  })
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The strate of the address.',
    example: 'Syrian street',
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
