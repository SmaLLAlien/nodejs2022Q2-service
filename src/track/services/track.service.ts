import { Injectable } from '@nestjs/common';
import { Track } from '../track.entity';
import { UpdateTrackDto } from '../dtos/UpdateTrackDto';
import { CreateTrackDto } from '../dtos/CreateTrackDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepo: Repository<Track>,
  ) {}

  async getAll(): Promise<Track[]> {
    return await this.trackRepo.find();
  }

  async getOne(id: string): Promise<Track> {
    return await this.trackRepo.findOne({ where: { id } });
  }

  async createTrack(track: CreateTrackDto): Promise<Track> {
    const newTrack: Track = this.trackRepo.create(track);
    return await this.trackRepo.save(newTrack);
  }

  async updateTrack(id: string, track: UpdateTrackDto) {
    const trackInDb: Track = await this.trackRepo.findOne({ where: { id } });
    if (!trackInDb) {
      return null;
    }
    const newTrack: Track = this.trackRepo.create({
      ...trackInDb,
      ...track,
      id,
    });
    return await this.trackRepo.save(newTrack);
  }

  async deleteTrack(id: string): Promise<Track> {
    const trackInDb: Track = await this.trackRepo.findOne({ where: { id } });
    if (!trackInDb) {
      return null;
    }
    await this.trackRepo.delete(id);

    return trackInDb;
  }
}
