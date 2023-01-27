import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex-mailer') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('YANDEX_CLIENT_ID'),
      clientSecret: configService.get('YANDEX_SECRET'),
      callbackURL: configService.get('YANDEX_CALLBACK_URL'),
      forceConfirm: true,
      force_confirm: 'true'
    });
  }
  authorizationParams(): { [key: string]: string; } {
    return ({
      force_confirm: 'true'
    });
  };
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    
    const { emails } = profile;

    const user = {
      email: emails[0].value,
      accessToken,
      refreshToken
    };
    
    done(null, user);
  }
}