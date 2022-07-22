import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dtos/CreateAlbumDto';
import { UpdateAlbumDto } from '../dtos/UpdateAlbumDto';
import { Album } from '../album.entity';
import { TrackService } from '../../track/services/track.service';
import { FavouritesService } from '../../favourites/services/favourites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepo: Repository<Album>,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavouritesService))
    private favsService: FavouritesService,
  ) {}

  async getAll(): Promise<Album[]> {
    return await this.albumRepo.find();
  }

  async getOne(id: string): Promise<Album> {
    return await this.albumRepo.findOne({ where: { id } });
  }

  async createAlbum(album: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumRepo.create(album);
    return await this.albumRepo.save(newAlbum);
  }

  async updateAlbum(id: string, album: UpdateAlbumDto): Promise<Album> {
    const albumInDb: Album = await this.albumRepo.findOne({ where: { id } });

    if (!albumInDb) {
      return null;
    }
    const newAlbum: Album = await this.albumRepo.create({
      ...albumInDb,
      ...album,
      id,
    });
    return await this.albumRepo.save(newAlbum);
  }

  async deleteAlbum(id: string): Promise<Album> {
    const albumInDb: Album = await this.albumRepo.findOne({ where: { id } });
    if (!albumInDb) {
      return null;
    }
    await this.albumRepo.delete(id);

    return albumInDb;
  }

  async findByKey(keyName: string, keyValue: any): Promise<Album[]> {
    const albums = await this.albumRepo.find({
      where: { [keyName]: [keyValue] },
    });
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
