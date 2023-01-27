import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-mailru-email';
const crypto = require('crypto');
@Injectable()
export class MailruStrategy extends PassportStrategy(Strategy, 'mailru-mailer') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('MAILRU_CLIENT_ID'),
      clientSecret: configService.get('MAILRU_SECRET'),
      callbackURL: configService.get('MAILRU_CALLBACK_URL'),
      scope:['mail.imap', 'userinfo'],
      state: crypto.randomBytes(16).toString('base64')
    });
  }
  
  authorizationParams(): { [key: string]: string; } {
    return ({
      scope:'mail.imap userinfo',
    });
  };

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    console.log(profile);
    
    const { emails } = profile;

    const user = {
      email: emails[0].value,
      accessToken,
      refreshToken
    };
    
    done(null, user);
  }
}