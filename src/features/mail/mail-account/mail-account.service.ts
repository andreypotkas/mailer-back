import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MailAccount } from './models/mail-account.model';

@Injectable()
export class MailAccountService {
  constructor(
      @InjectModel(MailAccount) private mailAccountRepository: typeof MailAccount,
    ){}

  public async getAll(): Promise<MailAccount[]> {
    return this.mailAccountRepository.findAll({ include: { all: true } });
  }

  public async getById(id: string): Promise<MailAccount> {
    return await this.mailAccountRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  public async getByEmail(email: string): Promise<MailAccount> {
    return await this.mailAccountRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async create( email: string, accessToken: string, refreshToken: string, service: string, userId: string ): Promise<MailAccount> {
    const mail = await this.getByEmail(email);

    if(mail){
      throw new BadGatewayException('Already exist');
    }
     
    return await this.mailAccountRepository.create(
      {
        email,
        accessToken,
        refreshToken,
        service,
        userId
      });
  }

  public async update(id: string, dto: { email?: string, accessToken?: string }): Promise<boolean> {
    const [result] = await this.mailAccountRepository.update(
      { ...dto },
      { where: { id } },
    );
    return !!result;
  }

  public async remove(id: string): Promise<boolean> {
    const result = await this.mailAccountRepository.destroy({ where: { id } });
    return !!result;
  }
}
