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
  
  @Table({ tableName: 'mail-accounts' })
  export class MailAccount extends Model<MailAccount> {
  
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
      allowNull: true,
    })
    accessToken: string;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    refreshToken: string;
  
    @Column({
      type: DataType.STRING,
      defaultValue: null,
    })
    service: string;
  
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
    })
    userId: string;
  }