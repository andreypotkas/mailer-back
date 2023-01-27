import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MailContact } from './models/mail-contact.model';

@Injectable()
export class MailContactService {
  constructor(@InjectModel(MailContact) private contactRepository: typeof MailContact){}

  public async getAll(): Promise<MailContact[]> {
    return await this.contactRepository.findAll({ include: { all: true } });
  }

  public async getAllByUserId(id: string): Promise<MailContact[]> {
    return await this.contactRepository.findAll({where: {mailContactListId: id}, include: { all: true } });
  }

  public async getById(id: string): Promise<MailContact> {
    return await this.contactRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  public async getByEmail(email: string): Promise<MailContact> {
    return await this.contactRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async create(body: MailContact): Promise<MailContact> {
    const {email} = body;
    
    const mail = await this.getByEmail(email);    
    
    if (mail) {      
      throw new ConflictException('This email already exist!')
    }

    return await this.contactRepository.create(
      body,
      {
        include: { all: true },
      }
    );
  }

  public async update(id: string, dto: { email?: string, password?: string }): Promise<boolean> {
    const [result] = await this.contactRepository.update(
      { ...dto },
      { where: { id } },
    );
    return !!result;
  }

  public async remove(id: string): Promise<boolean> {
    return !!await this.contactRepository.destroy({ where: { id } });
  }
}
