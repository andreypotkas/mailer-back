import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table,
  } from 'sequelize-typescript';
import { User } from 'src/features/users/models/users.model';
import { MailContact } from '../../mail-contact/models/mail-contact.model';
  
  @Table({ tableName: 'mail-contact-lists' })
  export class MailContactList extends Model<MailContactList> {
  
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
    name: string;

    @Column({
        type: DataType.STRING,
        unique: false,
        allowNull: true,
    })
    description: string;
  
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
    })
    userId: string;

    @HasMany(() => MailContact)
    mails: MailContact[]
  }