import { Module } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { ContactListController } from './contact-list.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactList } from './model/contact-list.model';

@Module({
  controllers: [ContactListController],
  providers: [ContactListService],
  imports:[
    SequelizeModule.forFeature([
      ContactList,
    ]),
  ]
})
export class ContactListModule {}
