import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { AddressModule } from './modules/address/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [AddressModule, UserModule, StudentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
