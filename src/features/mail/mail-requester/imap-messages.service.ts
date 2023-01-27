import { Injectable } from '@nestjs/common';
import { MailAccountService } from '../mail-account/mail-account.service';
import { IIMapMessage } from './models/imap-message.interface';
import { MailAccount } from '../mail-account/models/mail-account.model';
import { HttpService } from '@nestjs/axios';
const { ImapFlow } = require('imapflow');
const { google } = require('googleapis');
const simpleParser = require('mailparser').simpleParser;
@Injectable()
export class ImapMessagesService {
    constructor(private mailAccountService: MailAccountService, private http: HttpService){}

    public async getAllMessagesImap(id: string): Promise<IIMapMessage[]> {
        const email = await this.mailAccountService.getById(id);
        let messages: IIMapMessage[] = [];

        try {
          messages = await this.getMessages(email);
        } catch (err){
          const accessToken = await this.getTokenWithRefresh(email.refreshToken) as string;  
          
          this.mailAccountService.update(email.id, { accessToken });   
          email.accessToken = accessToken;
              
          messages = await this.getMessages(email);
        }
    
        return JSON.parse(JSON.stringify(messages, (key, value) =>
          typeof value === 'bigint'
              ? value.toString()
              : value // return everything else unchanged
      ));
    }
    
    public async getOneMessageImap(emailId: string, mailId: string): Promise<any> {
        const email = await this.mailAccountService.getById(emailId);
        let message: any;
    
        try {
          message = await this.getOneMessage(email, mailId);          
        } catch (err){
          const accessToken = await this.getTokenWithRefresh(email.refreshToken) as string;     
          this.mailAccountService.update(email.id, {accessToken});  
          email.accessToken = accessToken;
    
          message = await this.getOneMessage(email, mailId);          
        }
    
        return simpleParser(message.source);
    }

    private async getMessages (email: MailAccount): Promise<IIMapMessage[]> { 
    let arr = [];
    
    const client = new ImapFlow({
        host: email.service,
        port: 993,
        secure: true,
        auth: {
          user: email.email,
          accessToken: email.accessToken,
        },
    });
    
        const main = async () : Promise<IIMapMessage[]> => {
        // Wait until client connects and authorizes
        await client.connect();
    
        // Select and lock a mailbox. Throws if mailbox does not exist
        let lock = await client.getMailboxLock('INBOX');
        try {
            // fetch latest message source
            // client.mailbox includes information about currently selected mailbox
            // "exists" value is also the largest sequence number available in the mailbox
            let message = await client.fetchOne(client.mailbox.exists, { source: true });
    
            // console.log(message);
            
            // console.log(message.source.toString());
    
            // list subjects for all messages
            // uid value is always included in FETCH response, envelope strings are in unicode.
            for await (let message of client.fetch('1:*', { envelope: true, uid: true })) {
                arr.push(message.envelope);
            }
        } finally {
            // Make sure lock is released, otherwise next `getMailboxLock()` never returns
            lock.release();
        }
    
        // log out and close connection
            await client.logout();
            return arr;
        };
    
        return main().catch(err => {
            console.error(err)
            throw new Error(err)
        });
    }
    
    private async getOneMessage (email: MailAccount, number: string): Promise<IIMapMessage> { 
        let messageData;
        
        const client = new ImapFlow({
            host: email.service,
            port: 993,
            secure: true,
            auth: {
              user: email.email,
              accessToken: email.accessToken,
            },
        });
        
        const main = async () : Promise<IIMapMessage> => {
            // Wait until client connects and authorizes
            await client.connect();
        
            // Select and lock a mailbox. Throws if mailbox does not exist
            let lock = await client.getMailboxLock('INBOX');
            try {
                messageData = await client.fetchOne(`${number}`, { source: true });
                console.log(messageData);
                
                
            } finally {
                // Make sure lock is released, otherwise next `getMailboxLock()` never returns
                lock.release();
            }
        
            // log out and close connection
                await client.logout();
                return messageData;
            };
        
            return main().catch(err => {
              console.error(err)
              throw new Error(err)
        });
    }

    public getTokenWithRefresh (refreshToken: string) {
      return new Promise((resolve, reject) => {
        let oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_SECRET,
          process.env.GOOGLE_CALLBACK_MAILER_URL
        )
        
        oauth2Client.credentials.refresh_token = refreshToken;
        
        oauth2Client.refreshAccessToken(  (error, tokens) => {
               if( !error ){
                resolve(tokens.access_token)
               } else {
                reject(error)
               }
        })
  })
    } 

    // public async getTokenWithRefreshYandex (refreshToken: string, client_id: string, client_secret: string) {
    //   const query = {
    //     'grant_type': 'refresh_token',

    // }
    //   const data = await this.http.axiosRef.post(
    //     `https://oauth.yandex.ru/token/`,
    //     {
    //       grant_type: 'refresh_token',
    //       refresh_token: refreshToken,
    //       client_id,
    //       client_secret,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   }
    //     )
    //   console.log(data);
    //   return data.data.access_token
      
    // }
}
