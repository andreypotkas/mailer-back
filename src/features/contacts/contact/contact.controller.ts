import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { ContactService } from './contact.service';
import { Contact } from './models/contact.model';


@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() body: Contact) {    
    return this.contactService.create(body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('all')
  findAll() {
    return this.contactService.getAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAllbyUserId(@Req() req) {
    return this.contactService.getAllByUserId(req.user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.getById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailAccountDto: any) {
    return this.contactService.update(id, updateMailAccountDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
