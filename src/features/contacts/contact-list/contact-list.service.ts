import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactList } from './model/contact-list.model';

@Injectable()
export class ContactListService {
  constructor(@InjectModel(ContactList) private mailContactListRepository: typeof ContactList){}

  public async getAllByUserId(id: string): Promise<ContactList[]> {
    return await this.mailContactListRepository.findAll({where: {userId: id}, include: { all: true } });
  }

  public async getById(id: string): Promise<ContactList> {
    return await this.mailContactListRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  public async create( name: string, description:string, userId: string ): Promise<ContactList> {

    return await this.mailContactListRepository.create(
      {
        name,
        userId,
        description
      },
      {
        include: { all: true },
      }
    );
  }

  public async update(id: string, dto: { description?: string, name?: string }): Promise<boolean> {
    const [result] = await this.mailContactListRepository.update(
      { ...dto },
      { where: { id } },
    );
    return !!result;
  }

  public async remove(id: string): Promise<boolean> {
    return !!await this.mailContactListRepository.destroy({ where: { id } });
  }
}
