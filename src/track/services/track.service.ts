import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TrackRepository } from '../repository/track.repository';
import { Track } from '../track.entity';
import { UpdateTrackDto } from '../dtos/UpdateTrackDto';
import { CreateTrackDto } from '../dtos/CreateTrackDto';
import { FavouritesService } from '../../favourites/services/favourites.service';

@Injectable()
export class TrackService {
  constructor(
    private trackRepository: TrackRepository,
    @Inject(forwardRef(() => FavouritesService))
    private favsService: FavouritesService,
  ) {}

  async getAll(): Promise<Track[]> {
    return await this.trackRepository.getAll();
  }

  async getOne(id: string): Promise<Track> {
    return await this.trackRepository.findOne(id);
  }

  async createTrack(track: CreateTrackDto): Promise<Track> {
    return await this.trackRepository.create(track);
  }

  async updateTrack(id: string, track: UpdateTrackDto) {
    const trackInDb: Track = await this.trackRepository.findOne(id);
    if (!trackInDb) {
      return null;
    }
    const newTrack: Track = { ...trackInDb, ...track, id };
    return await this.trackRepository.update(id, newTrack);
  }

  async deleteTrack(id: string): Promise<Track> {
    const trackInDb: Track = await this.trackRepository.findOne(id);
    if (!trackInDb) {
      return null;
    }
    await this.trackRepository.deleteOne(id);
    await this.favsService.deleteTrack(id);
    return trackInDb;
  }

  async findByKey(keyName: string, keyValue: any): Promise<Track[]> {
    const tracks = await this.trackRepository.findByKey(keyName, keyValue);
    return tracks;
  }

  async deleteKey(keyName: string, keyValue: any): Promise<void> {
    const tracks = await this.findByKey(keyName, keyValue);
    if (tracks.length) {
      tracks.forEach((track) => {
        track[keyName] = null;
      });
      await Promise.all(
        tracks.map((track) => this.updateTrack(track.id, track)),
      );
    }
  }
}
