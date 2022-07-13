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
    return await this.albumRepository.update(id, album);
  }

  async deleteAlbum(id: string): Promise<Album> {
    return await this.albumRepository.deleteOne(id);
  }
}