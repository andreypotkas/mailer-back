import {
    Controller,
    Get,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { OauthService } from '../services/oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(private oauthService: OauthService) {}
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    
    const data = await this.oauthService.googleLogin(req);
    
    if (data) {
      return `<html><body><script>window.opener.postMessage('${JSON.stringify(
        data,
      )}', 'http://localhost:4200/main')</script></body></html>`;
    } else {
      return 'There was a problem signing in...';
    }
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: Request) {
    const data = await this.oauthService.facebookLogin(req);

    if (data) {
      return `<html><body><script>window.opener.postMessage('${JSON.stringify(
        data,
      )}', 'https://dyp.info')</script></body></html>`;
    } else {
      return 'There was a problem signing in...';
    }
  }
}
