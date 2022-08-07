import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
