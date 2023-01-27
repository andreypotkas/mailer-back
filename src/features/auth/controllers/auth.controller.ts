import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/shared/guards/refresh-token.guard';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { TokenService } from '../services/token.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly tokenService: TokenService) {}

  @Post('login')
  public login(@Body() dto: AuthDto): Promise<any> {
    return this.authService.login(dto);
  }

  @Post('signup')
  public signup(@Body() dto: AuthDto): Promise<any> {
    return this.authService.signup(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout/:id')
  public logout(@Param('id') id: string): Promise<boolean> {
    return this.authService.logout(id);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh/:id')
  public refreshTokens(
    @Param('id') id: string,
    @Req() req
  ): Promise<any> {        
    return this.tokenService.refreshTokens(id, req.user.refreshToken);
  }
}
