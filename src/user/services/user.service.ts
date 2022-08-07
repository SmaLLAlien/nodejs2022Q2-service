import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { UserDto } from '../dtos/UserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CryptService } from '../../auth/services/crypt.service';

@Injectable()
export class UserService {
  private readonly saltRound: number;

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private cryptService: CryptService,
    private configService: ConfigService,
  ) {
    const CRYPT_SALT = +this.configService.get<string>('CRYPT_SALT');
    this.saltRound = isNaN(CRYPT_SALT) ? 10 : CRYPT_SALT;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getOne(id: string): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser: UserDto = this.userRepo.create({
      ...user,
      password: this.cryptService.hashPassword(user.password),
      version: 1,
    });
    return await this.userRepo.save(newUser);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const userInDb: User = await this.userRepo.findOne({ where: { id } });
    if (!userInDb) {
      return null;
    }

    const isPasswordsEqual = this.cryptService.comparePasswords(
      user.oldPassword,
      userInDb.password,
    );

    if (!isPasswordsEqual) {
      throw new ForbiddenException('Password is incorrect');
    }

    const newUser: User = this.userRepo.create({
      ...userInDb,
      id,
      password: this.cryptService.hashPassword(user.newPassword),
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
