import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { IMailingListOptions } from './models/mailing-list.interface-options';
import { MailSenderService } from './mail-sender.service';


@Controller('send')
export class MailSenderController {
    constructor(private readonly MailSenderService: MailSenderService) {}

    @UseGuards(AccessTokenGuard)
    @Post()
    async create(@Body() body: IMailingListOptions) {      
    return await this.MailSenderService.createMailingList(body);
  }
}

