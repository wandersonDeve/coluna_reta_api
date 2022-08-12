import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../entities/address.entity';

export class CreateAddressDto extends Address {
  @IsString()
  city: string;

  @IsString()
  complement: string;

  @IsString()
  neighborhood: string;

  @IsString()
  number: string;

  @IsString()
  state: string;

  @IsString()
  street: string;

  @IsString()
  @IsNotEmpty()
  zip_code: string;
}
