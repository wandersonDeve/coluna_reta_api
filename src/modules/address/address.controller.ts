import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedAdmin } from 'src/modules/auth/decorator/logged-admin.decorator';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Address')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new address - (FOR ADMIN).',
  })
  create(
    @LoggedAdmin() user: User,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.create(createAddressDto);
  }

  @Get('all')
  @ApiOperation({
    summary: 'List all address - (FOR ADMIN).',
  })
  findAll(@LoggedAdmin() user: User) {
    return this.addressService.findAll();
  }

  @Get('search/:addressID')
  @ApiOperation({
    summary: 'View a address by Id - (FOR ADMIN).',
  })
  findOne(@LoggedAdmin() user: User, @Param('addressID') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch('update/:addressID')
  @ApiOperation({
    summary: 'Edit a address by Id - (FOR ADMIN).',
  })
  update(
    @LoggedAdmin() user: User,
    @Param('addressID') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete('delete/:addressID')
  @ApiOperation({
    summary: 'Remove a address by Id - (FOR ADMIN).',
  })
  remove(@LoggedAdmin() user: User, @Param('addressID') id: string) {
    return this.addressService.remove(+id);
  }
}
