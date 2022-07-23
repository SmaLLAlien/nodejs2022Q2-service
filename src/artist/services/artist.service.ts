import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dtos/CreateArtistDto';
import { UpdateArtistDto } from '../dtos/UpdateArtistDto';
import { Artist } from '../artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async getAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async getOne(id: string): Promise<Artist> {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async createArtist(artist: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistRepository.create(artist);
    return await this.artistRepository.save(newArtist);
  }

  async updateArtist(id: string, artist: UpdateArtistDto): Promise<Artist> {
    const artistInDb: Artist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artistInDb) {
      return null;
    }
    const newArtist: Artist = this.artistRepository.create({
      ...artistInDb,
      ...artist,
      id,
    });
    return await this.artistRepository.save(newArtist);
  }

  async deleteArtist(id: string): Promise<Artist> {
    const artistInDb: Artist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artistInDb) {
      return null;
    }
    await this.artistRepository.delete(id);

    return artistInDb;
  }
}
