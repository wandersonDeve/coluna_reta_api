import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';

@Module({
  controllers: [AddressController],
})
export class AddressModule {}
