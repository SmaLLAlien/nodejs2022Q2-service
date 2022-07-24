import { v4 as uuidv4 } from 'uuid';
import { User } from '../user.entity';
import { UserDto } from '../dtos/UserDto';

export class UserRepository {
  private users: Map<string, User> = new Map();

  async getAll(): Promise<User[]> {
    return [...this.users.values()];
  }

  async findOne(id: string): Promise<User> {
    const userInDb = this.users.get(id);
    if (userInDb) {
      return this.createUserInstance(userInDb);
    }

    return null;
  }

  async create(user: UserDto): Promise<User> {
    const newUser: User = { id: uuidv4(), ...user };
    this.users.set(newUser.id, newUser);

    return this.createUserInstance(newUser);
  }

  async update(id: string, newUser: User): Promise<User> {
    this.users.set(id, newUser);
    return this.createUserInstance(newUser);
  }

  async deleteOne(id: string): Promise<void> {
    this.users.delete(id);
  }

  async findByLogin(login: string): Promise<User> {
    const users: User[] = await this.getAll();
    return users.find((u) => u.login === login);
  }

  createUserInstance(user: User): User {
    const newUser = new User();
    Object.keys(user).forEach((key) => {
      newUser[key] = user[key];
    });

    return newUser;
  }
}
