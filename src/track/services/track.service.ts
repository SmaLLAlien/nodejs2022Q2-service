import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track } from '../track.entity';
import { UpdateTrackDto } from '../dtos/UpdateTrackDto';
import { CreateTrackDto } from '../dtos/CreateTrackDto';
import { FavouritesService } from '../../favourites/services/favourites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepo: Repository<Track>,
    @Inject(forwardRef(() => FavouritesService))
    private favsService: FavouritesService,
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

    // TODO check relations
    await this.favsService.deleteTrack(id);
    return trackInDb;
  }

  async findByKey(keyName: string, keyValue: any): Promise<Track[]> {
    const tracks = await this.trackRepo.find({
      where: { [keyName]: [keyValue] },
    });
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
