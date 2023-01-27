import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './models/users.model';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  public getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  public getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  public createUser(@Body() dto: { email: string, password: string }): Promise<User> {
    return this.usersService.createUser(dto.email, dto.password);
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  public updateUser(
    @Param('id') id: string,
    @Body() dto: { email: string, password: string },
  ): Promise<boolean> {
    return this.usersService.updateUser(id, dto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  public removeUser(@Param('id') id: string): Promise<boolean> {
    return this.usersService.removeUser(id);
  }
}
