import { Injectable } from '@nestjs/common';
import { ArtistRepository } from '../repository/artist.repository';
import { CreateArtistDto } from '../dtos/CreateArtistDto';
import { UpdateArtistDto } from '../dtos/UpdateArtistDto';
import { Artist } from '../artist.entity';

@Injectable()
export class ArtistService {
  constructor(private artistRepo: ArtistRepository) {}

  async getAll(): Promise<Artist[]> {
    return await this.artistRepo.getAll();
  }

  async getOne(id: string): Promise<Artist> {
    return await this.artistRepo.findOne(id);
  }

  async createArtist(artist: CreateArtistDto): Promise<Artist> {
    return await this.artistRepo.create(artist);
  }

  async updateArtist(id: string, artist: UpdateArtistDto): Promise<Artist> {
    const artistInDb: Artist = await this.artistRepo.findOne(id);
    if (!artistInDb) {
      return null;
    }
    const newArtist: Artist = { ...artistInDb, ...artist, id };
    return await this.artistRepo.update(id, newArtist);
  }

  async deleteArtist(id: string): Promise<Artist> {
    const artistInDb: Artist = await this.artistRepo.findOne(id);
    if (!artistInDb) {
      return null;
    }
    await this.artistRepo.deleteOne(id);
    return artistInDb;
  }
}
