import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

@Entity()
export class FavouritesEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { cascade: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}
