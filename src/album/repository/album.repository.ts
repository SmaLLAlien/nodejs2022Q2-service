import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dtos/CreateAlbumDto';
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

  async update(id: string, newAlbum: Album): Promise<Album> {
    this.albums.set(id, newAlbum);
    return newAlbum;
  }

  async deleteOne(id: string): Promise<void> {
    this.albums.delete(id);
  }
}
