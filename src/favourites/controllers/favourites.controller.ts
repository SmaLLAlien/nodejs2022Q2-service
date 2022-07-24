import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavouritesService } from '../services/favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private favsService: FavouritesService) {}

  @Get()
  getAllFavourites() {
    return this.favsService.getAllFavourites();
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    const artist = await this.favsService.addArtist(artistId);
    if (!artist) {
      throw new UnprocessableEntityException(
        `No artist exist with id ${artistId}`,
      );
    }
    return artist;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ) {
    const artist = await this.favsService.deleteArtist(artistId);
    if (!artist) {
      throw new UnprocessableEntityException(
        `No artist exist with id ${artistId}`,
      );
    }
    return artist;
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    const track = await this.favsService.addTrack(trackId);
    if (!track) {
      throw new UnprocessableEntityException(
        `No track exist with id ${trackId}`,
      );
    }
    return track;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ) {
    const track = await this.favsService.deleteTrack(trackId);
    if (!track) {
      throw new UnprocessableEntityException(
        `No track exist with id ${trackId}`,
      );
    }
    return track;
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    const album = await this.favsService.addAlbum(albumId);
    if (!album) {
      throw new UnprocessableEntityException(
        `No album exist with id ${albumId}`,
      );
    }
    return album;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ) {
    const album = await this.favsService.deleteAlbum(albumId);
    if (!album) {
      throw new UnprocessableEntityException(
        `No album exist with id ${albumId}`,
      );
    }
    return album;
  }
}
