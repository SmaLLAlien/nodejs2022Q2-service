import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Exclude } from 'class-transformer';

@Entity('Album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => Artist, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  @Exclude()
  artist: Artist;
}
