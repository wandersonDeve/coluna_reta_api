import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {
    const { } = user
    const url = `http://localhost:5005/auth/confirm?token=${token}&email=${user.email}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: process.env.MAIL_FROM,
      subject: 'Bem Vindo a Coluna Reta',
      template: './createAccount',
      context: {
        name: user.name,
        url,
      },
    });
    return {
      message: 'Foi enviado para o seu email uma link para confirmação',
    };
  }

  async sendLogErro(error: any) {
    const { local, message } = error;

    await this.mailerService.sendMail({
      to: process.env.MAIL_LOGS,
      from: process.env.MAIL_LOGS_FROM,
      subject: local,
      template: './logError',
      context: {
        log_error: message,
      },
    });
    return;
  }
}
