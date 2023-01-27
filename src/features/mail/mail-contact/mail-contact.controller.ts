import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { MailContactService } from './mail-contact.service';
import { MailContact } from './models/mail-contact.model';


@Controller('mail-contact')
export class MailContactController {
  constructor(private readonly mailContactService: MailContactService) {}
  
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() body: MailContact) {    
    return this.mailContactService.create(body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('all')
  findAll() {
    return this.mailContactService.getAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAllbyUserId(@Req() req) {
    return this.mailContactService.getAllByUserId(req.user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailContactService.getById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailAccountDto: any) {
    return this.mailContactService.update(id, updateMailAccountDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailContactService.remove(id);
  }
}
