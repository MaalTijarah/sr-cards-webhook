import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { EmailsService } from '../emails/emails.service';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SrCardsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emails: EmailsService,
    private readonly logger: Logger,
    private readonly config: ConfigService,
  ) {}

  async handleWebhook(callbackType: string, payload: any) {
    // Store in DB
    await this.prisma.webhook.create({
      data: {
        callbackType,
        payload: JSON.stringify(payload),
      },
    });

    // Send email
    await this.emails.sendWebhookNotification({
      to: this.config.get<string>('T0_EMAIL'),
      callbackType,
      payload: JSON.stringify(payload, null, 2),
      receivedAt: new Date().toISOString(),
    });

    this.logger.log('Webhook data stored and email sent.');

    return 'OK';
  }

  async listLogs() {
    return this.prisma.webhook.findMany();
  }
}
