import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import { MailAccount } from '../mail-account/models/mail-account.model';
import { MailAccountService } from '../mail-account/mail-account.service';
import { IMailingListOptions } from './models/mailing-list.interface-options';
const MailComposer = require('nodemailer/lib/mail-composer');

@Injectable()
export class MailSenderService {
  private nodemailerTransport: Mail;
  public yandexCredentials = { host: 'smtp.yandex.ru', clientId: process.env.YANDEX_CLIENT_ID, clientSecret: process.env.YANDEX_SECRET };
  public googleCredentials = { host: 'smtp.gmail.com', clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_SECRET };

    constructor(private mailAccountService: MailAccountService){}

      async createMailingList(info: IMailingListOptions) {
        const { mails, subject, message, senderAccountsIds } = info;
        console.log(info);
        
        const countMailsForEachAccount = Math.ceil(mails.length / senderAccountsIds.length);

        let mailAccount = await this.mailAccountService.getById(senderAccountsIds[0]);
        let sender = this.createSender(mailAccount);
        let delay:number = 5000;
        let count = 0;
        let currentAccountNumber = 1;

      //! Start Interval
        const intervalId = setInterval(async () => {
          
          const msg = `Send message number ${count} to ${mails[count]} from ${mailAccount.email}`;
          console.log(msg);
          

          if (count >= countMailsForEachAccount * currentAccountNumber) {
            console.log('Changed');
            
            currentAccountNumber++;
            mailAccount = await this.mailAccountService.getById(senderAccountsIds[currentAccountNumber-1]);
            sender = this.createSender(mailAccount);
          }
          
          this.send(sender, subject, msg, mails[count], mailAccount.email);
          count++;
          
          if (mails.length === count) {
            console.log('Clearing the interval id after 5 executions');
            clearInterval(intervalId);
          }

      }, delay);

      return JSON.stringify('Message sended succsessfully!');
    };

    public createSender(account: MailAccount) {
      const {email, accessToken, refreshToken, service} = account;
      let options;

      switch(service){
        case 'imap.yandex.com': options = this.yandexCredentials; break;
        case 'imap.gmail.com': options = this.googleCredentials; break;
        default: ''
      }

      const credentials = {...options, email, accessToken, refreshToken }

      return this.nodemailerTransport = createTransport({
        host: credentials.host,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            type: "OAuth2",
            method: "XOAUTH2",
            user: credentials.email,
            clientId: credentials.clientId,
            clientSecret: credentials.clientSecret,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken
        }
      });
      // return this.nodemailerTransport = createTransport({
      //   host: "smtp.ethereal.email",
      //   port: 587,
      //   secure: false, // true for 465, false for other ports
      //   auth: {
      //     user: testAccount.user, // generated ethereal user
      //     pass: testAccount.pass, // generated ethereal password
      //   },
      // });
    }

    private send(sender: any, subject: string, message: string, mailTo: string, emailSender: string){
        return sender.sendMail({
          from: 'sender@gmail.com',
          to: mailTo,
          subject: subject,
          html: message
        });
    }
}
