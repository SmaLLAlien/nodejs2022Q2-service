import { Injectable } from '@nestjs/common';
import { AlbumRepository } from '../repository/album.repository';
import { CreateAlbumDto } from '../dtos/CreateAlbumDto';
import { UpdateAlbumDto } from '../dtos/UpdateAlbumDto';
import { Album } from '../album.entity';

@Injectable()
export class AlbumService {
  constructor(private albumRepository: AlbumRepository) {}

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
    const albumInDb = this.albumRepository.findOne(id);
    if (!albumInDb) {
      return null;
    }
    const newAlbum: Album = { ...albumInDb, ...album, id };
    return await this.albumRepository.update(id, newAlbum);
  }

  async deleteAlbum(id: string): Promise<Album> {
    const albumInDb = this.albumRepository.findOne(id);
    if (!albumInDb) {
      return null;
    }
    await this.albumRepository.deleteOne(id);
    return albumInDb;
  }
}
