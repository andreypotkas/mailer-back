import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { MailAccount } from 'src/features/mail/mail-account/models/mail-account.model';
import { MailContactList } from 'src/features/mail/mail-contact-list/model/mail-contact-list.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {

  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  refreshToken: string;

  @HasMany(() => MailContactList)
  mailContactLists: MailContactList[];

  @HasMany(() => MailAccount)
  mailAccounts: MailAccount[];
}
