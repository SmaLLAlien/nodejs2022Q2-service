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
    return await this.trackRepository.update(id, track);
  }

  async deleteTrack(id: string): Promise<Track> {
    return await this.trackRepository.deleteOne(id);
  }
}
