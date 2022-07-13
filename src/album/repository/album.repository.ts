import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dtos/CreateAlbumDto';
import { UpdateAlbumDto } from '../dtos/UpdateAlbumDto';
import { Album } from '../album.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumRepository {
  private albums: Map<string, Album> = new Map();

  async getAll(): Promise<Album[]> {
    return [...this.albums.values()];
  }

  async findOne(id: string): Promise<Album> {
    return this.albums.get(id);
  }

  async create(artist: CreateAlbumDto): Promise<Album> {
    const newAlbum = { id: uuidv4(), ...artist };
    this.albums.set(newAlbum.id, newAlbum);
    return newAlbum;
  }

  async update(id: string, data: UpdateAlbumDto): Promise<Album> {
    const album = this.albums.get(id);
    if (!album) {
      return null;
    }
    const newAlbum = { ...album, ...data, id };
    this.albums.set(id, newAlbum);
    return newAlbum;
  }

  async deleteOne(id: string): Promise<Album> {
    const album = this.albums.get(id);

    if (album) {
      this.albums.delete(id);
    }
    return album;
  }
}
