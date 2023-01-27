import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import Mail from 'nodemailer/lib/mailer';
import { UsersService } from 'src/features/users/users.service';
import { ConfigService } from '@nestjs/config';
import { renderEmail } from 'src/shared/utils/email.template';
import { TokenService } from './token.service';
import { createTransport } from 'nodemailer';

@Injectable()
export class PassRecoveryService {
  private nodemailerTransport: Mail;
  constructor(
    private usersService: UsersService,
    private readonly tokenService: TokenService,
    private configService: ConfigService,
  ) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    })
  }

  async sendMail(email: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const { accessToken } = await this.tokenService.generateTokens(user);

    const options = {
      to: email,
      subject: 'LETTO MARKET - Password recovery',
      html: renderEmail(accessToken),
    };

    return this.nodemailerTransport.sendMail(options);
  }

  async updatePassword(data: AuthDto) {
    const user = await this.usersService.getUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const hashPassword = await bcrypt.hash(data.password, 5);

    return await this.usersService.updateUser(user.id, {
      email: data.email,
      password: hashPassword,
      refreshToken: user.refreshToken,
    });
  }
}
