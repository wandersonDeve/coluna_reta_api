import { AddressRequestDTO } from '../dtos/address-request.dto';
import { AddressRepository } from '../reporitory/address.repository';

export class CreateAddressService {
  constructor(private readonly addressRepository: AddressRepository) {}
  async execute(data: AddressRequestDTO) {
    const response = await this.addressRepository.createNewAddress(data);

    return response;
  }
}
