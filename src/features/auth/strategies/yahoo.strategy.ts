import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-yahoo-oauth2';

@Injectable()
export class YahooMailerStrategy extends PassportStrategy(Strategy, 'yahoo-mailer') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_MAILER_URL'),
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly', 'https://mail.google.com/'],
    });
  }

  authorizationParams(): { [key: string]: string; } {
    return ({
      access_type: 'offline',
      prompt: 'consent'
    });
  };

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken
    };

    done(null, user);
  }
}