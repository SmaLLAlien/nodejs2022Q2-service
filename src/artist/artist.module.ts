import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';
import { ArtistRepository } from './repository/artist.repository';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavouritesModule),
    TypeOrmModule.forFeature([Artist]),
  ],
})
export class ArtistModule {}
