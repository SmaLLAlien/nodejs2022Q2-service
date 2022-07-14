import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;
}
