import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from '../dtos/CreateArtistDto';
import { UpdateArtistDto } from '../dtos/UpdateArtistDto';
import { Artist } from '../artist.entity';
import { AlbumService } from '../../album/services/album.service';
import { TrackService } from '../../track/services/track.service';
import { FavouritesService } from '../../favourites/services/favourites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavouritesService))
    private favsService: FavouritesService,
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

    // TODO check relations
    await this.albumService.deleteKey('artistId', id);
    await this.trackService.deleteKey('artistId', id);
    await this.favsService.deleteArtist(id);
    return artistInDb;
  }
}
