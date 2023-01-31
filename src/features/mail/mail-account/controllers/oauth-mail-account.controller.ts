import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { MailAccountService } from '../mail-account.service';

@Controller('oauth-mail-account')
export class OauthMailAccountController {
    constructor(private readonly mailAccountService: MailAccountService) {}

    @Get('google')
    @UseGuards(AuthGuard('google-mailer'))
    async google() {}
  
    @Get('google/redirect')
    @UseGuards(AuthGuard('google-mailer'))
    async googleRedirect(@Req() req: Request) {
  
      const user = req.user as any;
      
      if (user) {
        return `
        <html><body><script>
        window.opener.postMessage('${JSON.stringify(user)}',
        'http://localhost:4200/main')
        </script></body></html>
        `;
      } else {
        return 'There was a problem signing in...';
      }
    }
  
    @Get('outlook')
    @UseGuards(AuthGuard('outlook-mailer'))
    async outlook() {}
  
    @Get('outlook/redirect')
    @UseGuards(AuthGuard('outlook-mailer'))
    async outlookRedirect(@Req() req: Request) {
  
      const user = req.user;
      
      if (user) {
        return `
        <html><body><script>
        window.opener.postMessage('${JSON.stringify(user,)}',
        'http://localhost:4200/main')
        </script></body></html>
        `;
      } else {
        return 'There was a problem signing in...';
      }
    }
  
    @Get('yandex')
    @UseGuards(AuthGuard('yandex-mailer'))
    async yandex() {}
  
    @Get('yandex/redirect')
    @UseGuards(AuthGuard('yandex-mailer'))
    async yandexRedirect(@Req() req: Request) {        
      const user = req.user as any;
      
      if (user) {
        return `
        <html><body><script>
        window.opener.postMessage('${JSON.stringify(user)}',
        'http://localhost:4200/main')
        </script></body></html>
        `;
      } else {
        return 'There was a problem signing in...';
      }
    }
}
