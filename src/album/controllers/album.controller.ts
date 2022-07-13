import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto } from '../dtos/CreateAlbumDto';
import { UpdateAlbumDto } from '../dtos/UpdateAlbumDto';
import { Album } from '../album.entity';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAlbums(): Promise<Album[]> {
    return await this.albumService.getAll();
  }

  @Get(':id')
  async getAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const album = await this.albumService.getOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  async createAlbum(@Body() album: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createArtist(album);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() album: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumService.updateArtist(id, album);
  }

  @Delete(':id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const album = await this.albumService.deleteArtist(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
}
