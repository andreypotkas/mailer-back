import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './models/contact.model';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact) private contactRepository: typeof Contact){}

  public async getAll(): Promise<Contact[]> {
    return await this.contactRepository.findAll({ include: { all: true } });
  }

  public async getAllByUserId(id: string): Promise<Contact[]> {
    return await this.contactRepository.findAll({where: {mailContactListId: id}, include: { all: true } });
  }

  public async getById(id: string): Promise<Contact> {
    return await this.contactRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  public async getByEmail(email: string): Promise<Contact> {
    return await this.contactRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async create(body: Contact): Promise<Contact> {
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
