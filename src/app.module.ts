import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { StudentModule } from './modules/student/student.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    AddressModule,
    UserModule,
    StudentModule,
    InstitutionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
