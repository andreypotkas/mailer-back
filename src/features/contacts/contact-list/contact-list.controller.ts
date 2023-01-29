import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';

@Controller('contact-list')
export class ContactListController {
  constructor(private readonly contactListService: ContactListService) {}
  
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() body: any, @Req() req) {    
    return this.contactListService.create(body.name, body.description, req.user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAllbyUserId(@Req() req) {
    return this.contactListService.getAllByUserId(req.user.id);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactListService.getById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailAccountDto: any) {
    return this.contactListService.update(id, updateMailAccountDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactListService.remove(id);
  }
}
