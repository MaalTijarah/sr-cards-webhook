import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendWebhookNotificationDto } from './dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class EmailsService {
  constructor(
    private readonly mailer: MailerService,
    private readonly logger: Logger,
  ) {}

  async sendWebhookNotification({
    to,
    callbackType,
    payload,
    receivedAt,
  }: SendWebhookNotificationDto) {
    try {
      await this.mailer.sendMail({
        to,
        subject: `SR-Cards Notification: `,
        template: 'webhook-notification',
        context: {
          callbackType,
          payloadJson: payload,
          receivedAt,
        },
      });
      this.logger.log(`Send notification for ${callbackType}`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
