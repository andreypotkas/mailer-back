import { Module } from '@nestjs/common';
import { MailAccountService } from './mail-account.service';
import { MailAccountController } from './controllers/mail-account.controller';
import { MailAccount } from './models/mail-account.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImapMessagesService } from '../mail-requester/imap-messages.service';
import { ImapMessagesController } from '../mail-requester/imap-messages.controller';
import { HttpModule } from '@nestjs/axios';
import { OauthMailAccountController } from './controllers/oauth-mail-account.controller';

@Module({
  controllers: [MailAccountController, ImapMessagesController, OauthMailAccountController],
  providers: [MailAccountService, ImapMessagesService ],
  imports:[
    SequelizeModule.forFeature([
      MailAccount,
    ]),
    HttpModule
  ],
  exports:[
    MailAccountService
  ]
})
export class MailAccountModule {}
