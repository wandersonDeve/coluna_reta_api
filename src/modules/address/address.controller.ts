import { Controller, Post } from '@nestjs/common';
import { AddressRequestDTO } from './dtos/address-request.dto';
import { CreateAddressService } from './services';

@Controller('address')
export class AddressController {
  constructor(private createAddressService: CreateAddressService) {}

  @Post('/create_address')
  async createAddress(data: AddressRequestDTO) {
    const response = await this.createAddressService.execute(data);

    return response;
  }
}
