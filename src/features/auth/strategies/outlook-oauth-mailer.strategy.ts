import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-outlook';

@Injectable()
export class OutlookruMailerStrategy extends PassportStrategy(Strategy, 'outlook-mailer') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('OUTLOOK_CLIENT_ID'),
      clientSecret: configService.get('OUTLOOK_SECRET'),
      callbackURL: configService.get('OUTLOOK_CALLBACK_MAILER_URL'),
      scope: ['profile', 'email', 'openid'],
    });
  }

  authorizationParams(): { [key: string]: string; } {
    return ({
      access_type: 'offline'
    });
  };

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    
    const user = {
      outlookId: profile.id,
      name: profile.DisplayName,
      email: profile.EmailAddress,
      accessToken:  accessToken
    } as any;

    if (refreshToken) user.refreshToken = refreshToken;
    if (profile.MailboxGuid) user.mailboxGuid = profile.MailboxGuid;
    if (profile.Alias) user.alias = profile.Alias;


    return done(null, user);
  }
}