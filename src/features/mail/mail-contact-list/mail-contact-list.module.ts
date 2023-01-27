import { Module } from '@nestjs/common';
import { MailContactListService } from './mail-contact-list.service';
import { MailContactListController } from './mail-contact-list.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailContactList } from './model/mail-contact-list.model';

@Module({
  controllers: [MailContactListController],
  providers: [MailContactListService],
  imports:[
    SequelizeModule.forFeature([
      MailContactList,
    ]),
  ]
})
export class MailContactListModule {}
