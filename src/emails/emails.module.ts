import { Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailsService } from './emails.service';
import { LoggerModule } from '../logger';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService): Promise<MailerOptions> => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          port: +config.get<string>('SMTP_PORT'),
          auth: {
            user: config.get<string>('SMTP_USER'),
            pass: config.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: config.get<string>('FROM_EMAIL'),
        },
        template: {
          dir: join(__dirname, 'emails/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
