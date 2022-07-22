import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dtos/CreateArtistDto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../artist.entity';

@Injectable()
export class ArtistRepository {
  // private artists: Map<string, Artist> = new Map();
  //
  // async getAll(): Promise<Artist[]> {
  //   return [...this.artists.values()];
  // }
  //
  // async findOne(id: string): Promise<Artist> {
  //   return this.artists.get(id);
  // }
  //
  // async create(artist: CreateArtistDto): Promise<Artist> {
  //   const newArtist: Artist = { id: uuidv4(), ...artist };
  //   this.artists.set(newArtist.id, newArtist);
  //   return newArtist;
  // }
  //
  // async update(id: string, newArtist: Artist): Promise<Artist> {
  //   this.artists.set(id, newArtist);
  //   return newArtist;
  // }
  //
  // async deleteOne(id: string): Promise<void> {
  //   this.artists.delete(id);
  // }
}
