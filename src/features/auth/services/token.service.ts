import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { catchError, from, map, Observable, of } from 'rxjs';
import { User } from 'src/features/users/models/users.model';
import { UsersService } from 'src/features/users/users.service';
import { AuthDto } from '../dto/auth.dto';
import { Tokens } from '../interfaces/token.interface';

@Injectable()
export class TokenService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
      ) {}
    public async refreshTokens(id: string, refreshToken: string): Promise<any> {
        const user = await this.usersService.getUserById(id);
        if (!user || !user.refreshToken) {
          throw new ForbiddenException('Access Denied');
        }
        
        const isRefreshTokenEquils = await bcrypt.compare(
          refreshToken,
          user.refreshToken,
        );
    
        if (!isRefreshTokenEquils) {
          throw new ForbiddenException('Access Denied');
        }
        
        const tokens = await this.generateTokens(user);
        
        await this.updateRefreshToken(user, tokens.refreshToken);
        return {
          user,
          tokens,
        };
    }
    
    public async generateTokens(user: User): Promise<Tokens> {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '9000s',
          },
        ),
        this.jwtService.signAsync(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
          },
        ),
      ]);
  
      return {
        accessToken,
        refreshToken,
      };
    }
    
    public async updateRefreshToken(
      user: User,
      refreshToken: string,
    ): Promise<void> {
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 5);
      await this.usersService.updateUser(user.id, {
        ...user,
        refreshToken: hashedRefreshToken,
      });
    }
  
    public async validateUser(dto: AuthDto): Promise<User> {
      const user = await this.usersService.getUserByEmail(dto.email);
  
      if (!user) {
        throw new BadRequestException('User does not exist');
      }
  
      const isPasswordEquals = await bcrypt.compare(dto.password, user.password);
  
      if (!isPasswordEquals) {
        throw new BadRequestException('Password is incorrect');
      }
  
      return user;
    }
  
    public getJwtUser(jwt: string): Observable<User | null> {
      return from(
        this.jwtService.verifyAsync(jwt, {
          secret: process.env.JWT_ACCESS_SECRET,
        }),
      ).pipe(
        map((user: User) => {
          return user;
        }),
          catchError(() => {
            return of(null);
          }),
        );
    }

    
}
