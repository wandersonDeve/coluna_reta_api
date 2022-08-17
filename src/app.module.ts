import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { AddressModule } from './address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InstitutionModule } from './institution/institution.module';

@Module({
  imports: [AuthModule, AddressModule, UserModule, InstitutionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
