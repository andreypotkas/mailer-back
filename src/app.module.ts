import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './features/auth/auth.module';
import { User } from './features/users/models/users.model';
import { MailAccountModule } from './features/mail/mail-account/mail-account.module';
import { MailAccount } from './features/mail/mail-account/models/mail-account.model';
import { MailContactModule } from './features/mail/mail-contact/mail-contact.module';
import { MailContact } from './features/mail/mail-contact/models/mail-contact.model';
import { MailContactListModule } from './features/mail/mail-contact-list/mail-contact-list.module';
import { MailContactList } from './features/mail/mail-contact-list/model/mail-contact-list.model';
import { MailSenderModule } from './features/mail/mail-sender/mail-sender.module';
import { MailRequesterModule } from './features/mail/mail-requester/mail-requester.module';

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
        MailContact,
        MailContactList
      ],
      autoLoadModels: true,
    }),

    AuthModule,
    MailAccountModule,
    MailContactModule,
    MailContactListModule,
    MailSenderModule,
    MailRequesterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
