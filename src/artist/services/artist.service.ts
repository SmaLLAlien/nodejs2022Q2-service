import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistRepository } from '../repository/artist.repository';
import { CreateArtistDto } from '../dtos/CreateArtistDto';
import { UpdateArtistDto } from '../dtos/UpdateArtistDto';
import { Artist } from '../artist.entity';
import { AlbumService } from '../../album/services/album.service';
import { TrackService } from '../../track/services/track.service';
import { FavouritesService } from '../../favourites/services/favourites.service';

@Injectable()
export class ArtistService {
  constructor(
    private artistRepo: ArtistRepository,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavouritesService))
    private favsService: FavouritesService,
  ) {}

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

    await this.albumService.deleteKey('artistId', id);
    await this.trackService.deleteKey('artistId', id);
    await this.favsService.deleteArtist(id);
    return artistInDb;
  }
}
