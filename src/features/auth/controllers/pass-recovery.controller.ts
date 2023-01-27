import {
    Body,
    Controller,
    Post,
    UseGuards,
  } from '@nestjs/common';

import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { PassRecoveryService } from '../services/pass-recovery.service';
  
  @Controller('pass-recovery')
  export class PassRecoveryController {
    constructor(private passRecoveryService: PassRecoveryService) {}
  
    @Post('send-email')
    public sendEmail(@Body() email: { email: string }): void {
      this.passRecoveryService.sendMail(email.email);
    }
    
    @UseGuards(AccessTokenGuard)
    @Post('new-password')
    public resetPassword(@Body() body): void {
      this.passRecoveryService.updatePassword(body);
    }  
  }
  