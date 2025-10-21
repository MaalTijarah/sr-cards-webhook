import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailsModule } from './emails/emails.module';
import { PrismaModule } from './prisma';
import { SrCardsModule } from './sr-cards/sr-cards.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EmailsModule,
    PrismaModule,
    SrCardsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
