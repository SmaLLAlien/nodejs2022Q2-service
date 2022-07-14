import { Injectable } from '@nestjs/common';
import { TrackRepository } from '../repository/track.repository';
import { Track } from '../track.entity';
import { UpdateTrackDto } from '../dtos/UpdateTrackDto';
import { CreateTrackDto } from '../dtos/CreateTrackDto';

@Injectable()
export class TrackService {
  constructor(private trackRepository: TrackRepository) {}

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
    return trackInDb;
  }
}
