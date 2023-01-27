import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MailContactListService } from './mail-contact-list.service';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

@Controller('mail-contact-list')
export class MailContactListController {
  constructor(private readonly mailContactListService: MailContactListService) {}
  
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() body: any, @Req() req) {    
    return this.mailContactListService.create(body.name, body.description, req.user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAllbyUserId(@Req() req) {
    return this.mailContactListService.getAllByUserId(req.user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailContactListService.getById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailAccountDto: any) {
    return this.mailContactListService.update(id, updateMailAccountDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailContactListService.remove(id);
  }
}
