import { forwardRef, Module } from '@nestjs/common';
import { FavouritesService } from './services/favourites.service';
import { FavouritesController } from './controllers/favourites.controller';
import { FavouritesRepository } from './repository/favourites.repository';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesEntity } from './favourites.entity';

@Module({
  providers: [FavouritesService, FavouritesRepository],
  controllers: [FavouritesController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    TypeOrmModule.forFeature([FavouritesEntity]),
  ],
  exports: [FavouritesService],
})
export class FavouritesModule {}
