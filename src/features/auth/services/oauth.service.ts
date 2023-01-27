import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/features/users/models/users.model';
import { UsersService } from 'src/features/users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { Tokens } from '../interfaces/token.interface';
import { TokenService } from './token.service';

@Injectable()
export class OauthService {
    constructor(
      private authService: AuthService,
      private usersService: UsersService,
      private readonly tokenService: TokenService
    ){}

    public async googleLogin(req): Promise<any> {
        if (!req.user) {
          return 'No user from google';
        }
    
        const user = await this.usersService.getUserByEmail(req.user.email);
    
        if (!user) {
          return this.authService.signup({
            email: req.user.email,
            password: 'test_password',
          });
        }
    
        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.updateRefreshToken(user, tokens.refreshToken);
    
        return {
          user,
          tokens,
        };
      }
    
    public async facebookLogin(req): Promise<any> {
      if (!req.user) {
        return 'No user from google';
      }
  
      const user = await this.usersService.getUserByEmail(req.user.email);
  
      if (!user) {
        return this.authService.signup({
          email: req.user.email,
          password: 'test_password',
        });
      }
  
      const tokens = await this.tokenService.generateTokens(user);
      await this.tokenService.updateRefreshToken(user, tokens.refreshToken);
  
      return {
        user,
        tokens,
      };
    }  
}
