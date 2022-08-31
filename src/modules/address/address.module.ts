import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../../prisma/service/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AddressController],
  providers: [AddressService, PrismaService],
})
export class AddressModule {}
