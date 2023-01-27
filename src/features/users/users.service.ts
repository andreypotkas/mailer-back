import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  public async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async createUser( email: string, password: string, role: string = 'user', refreshToken: string = null ): Promise<User> {
    return await this.userRepository.create(
      {
        email,
        password, 
        refreshToken, 
        role,
      });
  }

  public async updateUser(id: string, dto: { email?: string, password?: string, refreshToken?: string }): Promise<boolean> {
    const [result] = await this.userRepository.update(
      { ...dto },
      { where: { id } },
    );
    return !!result;
  }

  public async removeUser(id: string): Promise<boolean> {
    const result = await this.userRepository.destroy({ where: { id } });
    return !!result;
  }
}
