import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from 'nestjs-pino';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly logger: Logger) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('DATABASE CONNECTION INITIALIZED.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
