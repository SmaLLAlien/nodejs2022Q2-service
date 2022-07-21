import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserDto } from '../dtos/UserDto';
import * as bcrypt from 'bcrypt';
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
    // const hashPassword = await this.hashPassword(user.password);

    const newUser: UserDto = this.userRepo.create({
      ...user,
      // password: hashPassword,
      version: 1,
    });
    return await this.userRepo.save(newUser);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const userInDb: User = await this.userRepo.findOne({ where: { id } });
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
      throw new ForbiddenException('New password is incorrect');
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
