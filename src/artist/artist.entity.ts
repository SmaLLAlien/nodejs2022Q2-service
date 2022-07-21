import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
