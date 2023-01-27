import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';
import { MailSenderController } from './mail-sender.controller';
import { MailAccountModule } from '../mail-account/mail-account.module';


@Module({
  controllers: [MailSenderController],
  providers: [MailSenderService],
  imports:[MailAccountModule]
})
export class MailSenderModule {}
