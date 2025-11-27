import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { EmailsService } from '../emails/emails.service';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SrCardsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emails: EmailsService,
    private readonly logger: Logger,
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {}
  async handleWebhook(callbackType: string, payload: any) {
    if (callbackType === 'SR_CARD_AUTH') {
      try {
        const baseUrl = this.config.get<string>('TRUEFIN_BASE_URL');
        const apiPasscode = this.config.get<string>('TRUEFIN_API_PASSCODE');

        const res = await lastValueFrom(
          this.http.post(
            `${baseUrl}/api/withdrawals`,
            {
              callback_type: callbackType,
              payload: payload,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-api-passcode': apiPasscode,
              },
            },
          ),
        );

        console.log(res);

        const data = res?.data;
        console.log('POST data: ', data);
      } catch (error) {
        console.log(error);
      }
    }

    // Store in DB
    await this.prisma.webhook.create({
      data: {
        callbackType,
        payload: JSON.stringify(payload),
      },
    });

    // Send email
    // await this.emails.sendWebhookNotification({
    //   to: this.config.get<string>('T0_EMAIL'),
    //   callbackType,
    //   payload: JSON.stringify(payload, null, 2),
    //   receivedAt: new Date().toISOString(),
    // });

    this.logger.log(`Webhook data stored with callbackType: ${callbackType}`);
    this.logger.log(
      `Webhook data stored with payload: ${JSON.stringify(payload, null, 2)}`,
    );
    this.logger.log('Webhook data stored and email sent.');

    return 'OK';
  }

  async listLogs() {
    return this.prisma.webhook.findMany({
      orderBy: { receivedAt: 'asc' },
      take: 100,
    });
  }
}
