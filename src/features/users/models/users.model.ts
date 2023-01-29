import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ContactList } from 'src/features/contacts/contact-list/model/contact-list.model';
import { MailAccount } from 'src/features/mail/mail-account/models/mail-account.model';

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

  @HasMany(() => ContactList)
  mailContactLists: ContactList[];

  @HasMany(() => MailAccount)
  mailAccounts: MailAccount[];
}
