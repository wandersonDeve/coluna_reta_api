import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/service/prisma.service';
import { HistoricModule } from './modules/historic/historic.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { StudentModule } from './modules/student/student.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './modules/upload/upload.module';
// import { ConsumerModule } from './shared/sqs/consumer/consumer.module';
// import { ProducerModule } from './shared/sqs/producer/producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    StudentModule,
    InstitutionModule,
    MailModule,
    HistoricModule,
    UploadModule,
    // ConsumerModule,
    // ProducerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
