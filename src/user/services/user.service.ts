import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserDto } from '../dtos/UserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    // const hashPassword = await this.hashPassword(user.password);

    const newUser: UserDto = {
      ...user,
      // password: hashPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return await this.userRepository.create(newUser);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const userInDb: User = await this.userRepository.findOne(id);
    if (!userInDb) {
      return null;
    }

    // const isPasswordsEqual = await this.comparePasswords(
    //   user.oldPassword,
    //   userInDb.password,
    // );

    // if (!isPasswordsEqual) {
    //   throw new ForbiddenException('Old password is incorrect');
    // }

    if (userInDb.password !== user.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const newUser: User = {
      ...userInDb,
      id,
      password: user.newPassword,
      version: (userInDb.version += 1),
      updatedAt: Date.now(),
    };
    return await this.userRepository.update(id, newUser);
  }

  async deleteUser(id: string): Promise<User> {
    const userInDb: User = await this.userRepository.findOne(id);
    if (!userInDb) {
      return null;
    }

    await this.userRepository.deleteOne(id);
    return userInDb;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async comparePasswords(
    newPassword: string,
    hashOldPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(newPassword, hashOldPassword);
  }
}
