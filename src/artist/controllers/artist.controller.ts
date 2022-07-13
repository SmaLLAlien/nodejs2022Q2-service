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
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dtos/CreateArtistDto';
import { UpdateArtistDto } from '../dtos/UpdateArtistDto';
import { Artist } from '../artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getArtists(): Promise<Artist[]> {
    return await this.artistService.getAll();
  }

  @Get(':id')
  async getArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    const artist = await this.artistService.getOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  async createArtist(@Body() artist: CreateArtistDto): Promise<Artist> {
    return await this.artistService.createArtist(artist);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() artist: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.updateArtist(id, artist);
  }

  @Delete(':id')
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    const artist: Artist = await this.artistService.deleteArtist(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }
}
