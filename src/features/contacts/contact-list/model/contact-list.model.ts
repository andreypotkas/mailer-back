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
import { Contact } from '../../contact/models/contact.model';
  
  @Table({ tableName: 'mail-contact-lists' })
  export class ContactList extends Model<ContactList> {
  
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

    @HasMany(() => Contact)
    mails: Contact[]
  }