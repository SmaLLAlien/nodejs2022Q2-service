import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  @HttpCode(201)
  async createAlbum(@Body() album: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(album);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() album: UpdateAlbumDto,
  ): Promise<Album> {
    const updatedAlbum = await this.albumService.updateAlbum(id, album);
    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const album = await this.albumService.deleteAlbum(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }
}
