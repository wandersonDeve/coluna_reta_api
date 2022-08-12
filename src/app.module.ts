import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';

@Module({
  imports: [AddressModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
