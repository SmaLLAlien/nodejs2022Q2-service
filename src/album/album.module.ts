import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { AlbumRepository } from './repository/album.repository';
import { TrackModule } from '../track/track.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
  exports: [AlbumService],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavouritesModule),
  ],
})
export class AlbumModule {}
