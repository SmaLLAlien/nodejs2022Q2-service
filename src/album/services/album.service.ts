import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dtos/CreateAlbumDto';
import { UpdateAlbumDto } from '../dtos/UpdateAlbumDto';
import { Album } from '../album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepo: Repository<Album>,
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
}
