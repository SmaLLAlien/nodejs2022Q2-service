import { v4 as uuidv4 } from 'uuid';
import { Track } from '../track.entity';
import { CreateTrackDto } from '../dtos/CreateTrackDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackRepository {
  // private tracks: Map<string, Track> = new Map();
  //
  // async getAll(): Promise<Track[]> {
  //   return [...this.tracks.values()];
  // }
  //
  // async findOne(id: string): Promise<Track> {
  //   return this.tracks.get(id);
  // }
  //
  // async create(track: CreateTrackDto): Promise<Track> {
  //   const newTrack = { id: uuidv4(), ...track };
  //   this.tracks.set(newTrack.id, newTrack);
  //   return newTrack;
  // }
  //
  // async update(id: string, newTrack: Track): Promise<Track> {
  //   this.tracks.set(id, newTrack);
  //   return newTrack;
  // }
  //
  // async deleteOne(id: string): Promise<void> {
  //   this.tracks.delete(id);
  // }
  //
  // async findByKey(keyName: string, keyValue: any): Promise<Track[]> {
  //   const allAlbums = await this.getAll();
  //   const tracks = allAlbums.filter((album) => album[keyName] === keyValue);
  //   return tracks;
  // }
}
