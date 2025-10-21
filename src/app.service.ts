import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): string {
    return 'SR-Cards Webhook Receiver is running ✅';
  }
}
