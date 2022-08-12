import { PrismaClient } from '@prisma/client';
import { AddressRequestDTO } from '../dtos/address-request.dto';

export class AddressRepository {
  constructor(private readonly prisma: PrismaClient) {}

  address = this.prisma.address;

  async createNewAddress(data: AddressRequestDTO) {
    return await this.address.create({ data });
  }

  async findOneById(id: number) {
    return await this.address.findFirst({ where: { id } });
  }

  async updateOneById(id: number, data: AddressRequestDTO) {
    return await this.address.update({ where: { id }, data });
  }

  async deleteOneById(id: number) {
    return await this.address.delete({ where: { id } });
  }
}
