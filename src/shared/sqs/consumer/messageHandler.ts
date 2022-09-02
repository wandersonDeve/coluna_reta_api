import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { MailService } from '../../../modules/mail/mail.service';
import { config } from '../../../configs/sqs.config';

console.log('config.AWS_REGION', config);
@Injectable()
export class MessageHandler {
  constructor(private mailService: MailService) {}

  @SqsMessageHandler(config.SQS_QUEUE_NAME, false)
  async handleMessage(message: AWS.SQS.Message) {
    const obj: any = JSON.parse(message.Body) as {
      message: string;
      date: string;
    };

    const { data } = JSON.parse(obj.Message);

    console.log(data);

    await this.mailService.sendLogErro(data);
  }
}
