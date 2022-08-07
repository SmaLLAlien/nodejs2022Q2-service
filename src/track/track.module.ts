import { Module } from '@nestjs/common';
import { TrackService } from './services/track.service';
import { TrackController } from './controllers/track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
  imports: [TypeOrmModule.forFeature([Track])],
})
export class TrackModule {}
