import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'prisma/service/prisma.service';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(private db: PrismaService) {}

  async create(data: CreateAddressDto): Promise<Address> {
    return this.db.address.create({
      data: {
        ...data,
      },
    });
  }

  async findAll(): Promise<Address[]> {
    return this.db.address.findMany();
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.db.address.findFirst({
      where: {
        id,
      },
    });

    if (!address) {
      throw new Error(`Address not found`);
    }

    return address;
  }

  async update(id: number, data: UpdateAddressDto): Promise<Address> {
    const address = await this.db.address.findFirst({
      where: {
        id,
      },
    });

    if (!address) {
      throw new Error(`Address not found`);
    }

    return this.db.address.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async remove(id: number): Promise<string> {
    const address = this.db.address.findFirst({
      where: {
        id,
      },
    });

    if (!address) {
      throw new Error(`Address not found`);
    }

    await this.db.address.delete({
      where: {
        id,
      },
    });

    return `Address deleted`;
  }
}
