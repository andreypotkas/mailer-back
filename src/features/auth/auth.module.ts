import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { FacebookStrategy } from './strategies/facebook-oauth.strategy';
import { GoogleMailerStrategy } from './strategies/google-oauth-mailer.strategy';
import { GoogleStrategy } from './strategies/google-oauth.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { OauthController } from './controllers/oauth.controller';
import { TokenService } from './services/token.service';
import { OauthService } from './services/oauth.service';
import { OutlookruMailerStrategy } from './strategies/outlook-oauth-mailer.strategy';
import { YandexStrategy } from './strategies/yandex-oauth.strategy';
import { MailruStrategy } from './strategies/mailru-oauth.strategy';

@Module({
  controllers: [AuthController, OauthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
    ConfigService,
    FacebookStrategy,
    GoogleMailerStrategy,
    OutlookruMailerStrategy,
    TokenService,
    OauthService,
    YandexStrategy,
    MailruStrategy
  ],
  imports: [forwardRef(() => UsersModule), JwtModule.register({})],
  exports: [AuthService, JwtModule, ConfigService],
})
export class AuthModule {}
