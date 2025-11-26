import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SrCardsService } from './sr-cards.service';
import { CallBackType, Serialize } from '../decorators';

@Controller('money-collect')
export class SrCardsController {
  constructor(private readonly srCardsService: SrCardsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('webhook')
  async handleWebhook(
    @Body() payload: any,
    @CallBackType() callbackType: string,
  ) {
    return this.srCardsService.handleWebhook(callbackType, payload);
  }

  @Serialize()
  @Get('logs')
  async listLogs() {
    return this.srCardsService.listLogs();
  }
}
