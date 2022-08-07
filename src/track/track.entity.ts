import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Exclude } from 'class-transformer';
import { Album } from '../album/album.entity';

@Entity('Track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @OneToOne(() => Artist, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  @Exclude()
  artist: Artist;

  @OneToOne(() => Album, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  @Exclude()
  album: Album;
}
