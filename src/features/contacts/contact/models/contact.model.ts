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
import { ContactList } from '../../contact-list/model/contact-list.model';
  
  @Table({ tableName: 'mail-contacts' })
  export class Contact extends Model<Contact> {
  
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
      unique: false,
      allowNull: true,
    })
    name: string;

    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })
    description: string;

    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })
    facebook: string;

    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })
    instagram: string;

    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })

    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })

    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })
    linkedin: string;
    
    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })
    phoneNumber: string;

    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })
    telegram: string;
    
    @Column({
      type: DataType.STRING,
      unique: false,
      allowNull: true,
    })
    whatsup: string;
  
    @BelongsTo(() => ContactList)
    mailContactList: ContactList;

    @ForeignKey(() => ContactList)
    @Column({
      type: DataType.UUID,
    })
    mailContactListId: string;
  }