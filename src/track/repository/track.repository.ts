import { v4 as uuidv4 } from 'uuid';
import { Track } from '../track.entity';
import { CreateTrackDto } from '../dtos/CreateTrackDto';
import { UpdateTrackDto } from '../dtos/UpdateTrackDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackRepository {
  private tracks: Map<string, Track> = new Map();

  async getAll(): Promise<Track[]> {
    return [...this.tracks.values()];
  }

  async findOne(id: string): Promise<Track> {
    return this.tracks.get(id);
  }

  async create(track: CreateTrackDto): Promise<Track> {
    const newTrack = { id: uuidv4(), ...track };
    this.tracks.set(newTrack.id, newTrack);
    return newTrack;
  }

  async update(id: string, data: UpdateTrackDto): Promise<Track> {
    const track = this.tracks.get(id);
    if (!track) {
      return null;
    }
    const newTrack = { ...track, ...data, id };
    this.tracks.set(id, newTrack);
    return newTrack;
  }

  async deleteOne(id: string): Promise<Track> {
    const track = this.tracks.get(id);

    if (track) {
      this.tracks.delete(id);
    }
    return track;
  }
}
