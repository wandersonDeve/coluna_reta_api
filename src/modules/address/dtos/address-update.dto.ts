import { PartialType } from '@nestjs/mapped-types';
import { AddressRequestDTO } from './address-request.dto';

export class AddressUpdateDTO extends PartialType(AddressRequestDTO) {}
