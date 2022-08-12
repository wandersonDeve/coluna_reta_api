import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaService } from 'prisma/service/prisma.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaService]
})
export class AddressModule {}
