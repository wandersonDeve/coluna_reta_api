import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { config } from '../../../configs/sqs.config';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class MessageProducer {
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage(body: any) {
    const message: any = JSON.stringify(body);

    try {
      await this.sqsService.send(config.SQS_QUEUE_NAME, {
        body: message,
        id: uuidV4(),
        deduplicationId: uuidV4(),
        groupId: uuidV4(),
      });
      console.log(message);
      return;
    } catch (error) {
      console.log('error in producing email!', error);
    }
  }
}
