import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserDto } from '../dtos/UserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getOne(id: string): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser: UserDto = this.userRepo.create({
      ...user,
      version: 1,
    });
    return await this.userRepo.save(newUser);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const userInDb: User = await this.userRepo.findOne({ where: { id } });
    if (!userInDb) {
      return null;
    }

    const newUser: User = this.userRepo.create({
      ...userInDb,
      id,
      password: user.newPassword,
      version: (userInDb.version += 1),
    });
    return await this.userRepo.save(newUser);
  }

  async deleteUser(id: string): Promise<User> {
    const userInDb: User = await this.userRepo.findOne({ where: { id } });
    if (!userInDb) {
      return null;
    }

    await this.userRepo.delete(id);
    return userInDb;
  }

  async find(login: string) {
    return await this.userRepo.findOne({ where: { login } });
  }
}
