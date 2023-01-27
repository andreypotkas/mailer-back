import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from '../dto/auth.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  public async login(dto: AuthDto): Promise<any> {
    const user = await this.tokenService.validateUser(dto);
    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.updateRefreshToken(user, tokens.refreshToken);

    return {
      user,
      tokens,
    };
  }

  public async signup(dto: AuthDto): Promise<any> {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new BadRequestException('User with this Email is already exist');
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser(
      dto.email,
      hashPassword,
    );

    const tokens = await this.tokenService.generateTokens(user);
    await this.tokenService.updateRefreshToken(user, tokens.refreshToken);

    return this.login(dto);
  }

  public async logout(id: string): Promise<boolean> {
    const user = await this.usersService.getUserById(id);
    return await this.usersService.updateUser(user.id, {
      ...user,
      refreshToken: null,
    });
  }
}
