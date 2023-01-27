import { Module } from '@nestjs/common';
import { MailContactService } from './mail-contact.service';
import { MailContactController } from './mail-contact.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailContact } from './models/mail-contact.model';

@Module({
  controllers: [MailContactController],
  providers: [MailContactService],
  imports:[
    SequelizeModule.forFeature([
      MailContact,
    ]),
  ]
})
export class MailContactModule {}
