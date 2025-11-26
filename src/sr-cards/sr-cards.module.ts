import { Module } from '@nestjs/common';
import { SrCardsService } from './sr-cards.service';
import { SrCardsController } from './sr-cards.controller';
import { EmailsModule } from '../emails/emails.module';
import { LoggerModule } from '../logger';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [EmailsModule, LoggerModule, HttpModule],
  controllers: [SrCardsController],
  providers: [SrCardsService],
})
export class SrCardsModule {}
