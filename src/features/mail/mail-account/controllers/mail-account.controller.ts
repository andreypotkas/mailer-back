import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { MailAccountService } from '../mail-account.service';

@Controller('mail-account')
export class MailAccountController {
  constructor(private readonly mailAccountService: MailAccountService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() body: any, @Req() req) {        
    return this.mailAccountService.create(body.email, body.accessToken, body.refreshToken, body.service, req.user.id);
  }

  @Get()
  findAll() {
    return this.mailAccountService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailAccountService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailAccountDto: any) {
    return this.mailAccountService.update(id, updateMailAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailAccountService.remove(id);
  }
}
