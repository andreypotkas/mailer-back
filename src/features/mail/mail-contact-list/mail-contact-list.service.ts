import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MailContactList } from './model/mail-contact-list.model';

@Injectable()
export class MailContactListService {
  constructor(@InjectModel(MailContactList) private mailContactListRepository: typeof MailContactList){}

  public async getAllByUserId(id: string): Promise<MailContactList[]> {
    return await this.mailContactListRepository.findAll({where: {userId: id}, include: { all: true } });
  }

  public async getById(id: string): Promise<MailContactList> {
    return await this.mailContactListRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  public async create( name: string, description:string, userId: string ): Promise<MailContactList> {

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
