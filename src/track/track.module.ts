import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';
import { TrackRepository } from './repository/track.repository';
import { FavouritesModule } from '../favourites/favourites.module';

@Module({
  providers: [TrackService, TrackRepository],
  controllers: [TrackController],
  exports: [TrackService],
  imports: [forwardRef(() => FavouritesModule)],
})
export class TrackModule {}
