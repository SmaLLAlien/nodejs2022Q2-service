import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumRepository } from '../repository/album.repository';
import { CreateAlbumDto } from '../dtos/CreateAlbumDto';
import { UpdateAlbumDto } from '../dtos/UpdateAlbumDto';
import { Album } from '../album.entity';
import { TrackService } from '../../track/services/track.service';
import { FavouritesService } from '../../favourites/services/favourites.service';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavouritesService))
    private favsService: FavouritesService,
  ) {}

  async getAll(): Promise<Album[]> {
    return await this.albumRepository.getAll();
  }

  async getOne(id: string): Promise<Album> {
    return await this.albumRepository.findOne(id);
  }

  async createAlbum(album: CreateAlbumDto): Promise<Album> {
    return await this.albumRepository.create(album);
  }

  async updateAlbum(id: string, album: UpdateAlbumDto) {
    const albumInDb: Album = await this.albumRepository.findOne(id);

    if (!albumInDb) {
      return null;
    }
    const newAlbum: Album = { ...albumInDb, ...album, id };
    return await this.albumRepository.update(id, newAlbum);
  }

  async deleteAlbum(id: string): Promise<Album> {
    const albumInDb: Album = await this.albumRepository.findOne(id);
    if (!albumInDb) {
      return null;
    }
    await this.albumRepository.deleteOne(id);
    await this.trackService.deleteKey('albumId', id);
    await this.favsService.deleteAlbum(id);
    return albumInDb;
  }

  async findByKey(keyName: string, keyValue: any): Promise<Album[]> {
    const albums = await this.albumRepository.findByKey(keyName, keyValue);
    return albums;
  }

  async deleteKey(keyName: string, keyValue: any) {
    const albums = await this.findByKey(keyName, keyValue);
    if (albums.length) {
      albums.forEach((album) => {
        album[keyName] = null;
      });
      await Promise.all(
        albums.map((album) => this.updateAlbum(album.id, album)),
      );
    }
  }
}
