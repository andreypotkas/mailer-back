import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ImapMessagesService } from './imap-messages.service';

@Controller('imap-messages')
export class ImapMessagesController {
    constructor(private readonly imapMessagesService: ImapMessagesService) {}

    @Get('messages/:id')
    findAllMessages(@Param() id: any) {
      return this.imapMessagesService.getAllMessagesImap(id.id);
    }
  
    @Get('message/:id/:number')
    findOneMessage(@Param() params: any) {            
      return this.imapMessagesService.getOneMessageImap(params.id, params.number)
    }
}
