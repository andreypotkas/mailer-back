import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './features/auth/auth.module';
import { User } from './features/users/models/users.model';
import { MailAccountModule } from './features/mail/mail-account/mail-account.module';
import { MailAccount } from './features/mail/mail-account/models/mail-account.model';
import { MailSenderModule } from './features/mail/mail-sender/mail-sender.module';
import { MailRequesterModule } from './features/mail/mail-requester/mail-requester.module';
import { Contact } from './features/contacts/contact/models/contact.model';
import { ContactList } from './features/contacts/contact-list/model/contact-list.model';
import { ContactModule } from './features/contacts/contact/contact.module';
import { ContactListModule } from './features/contacts/contact-list/contact-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        MailAccount,
        Contact,
        ContactList
      ],
      autoLoadModels: true,
    }),

    AuthModule,
    MailAccountModule,
    ContactModule,
    ContactListModule,
    MailSenderModule,
    MailRequesterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
