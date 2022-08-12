import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { CreateAddressService } from './services';

@Module({
  controllers: [AddressController],
  providers: [CreateAddressService],
})
export class AddressModule {}
