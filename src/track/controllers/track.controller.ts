import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from '../services/track.service';
import { Track } from '../track.entity';
import { CreateTrackDto } from '../dtos/CreateTrackDto';
import { UpdateTrackDto } from '../dtos/UpdateTrackDto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getTracks(): Promise<Track[]> {
    return await this.trackService.getAll();
  }

  @Get(':id')
  async getTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    const track: Track = await this.trackService.getOne(id);
    if (!track) {
      throw new NotFoundException('Album not found');
    }
    return track;
  }

  @Post()
  @HttpCode(201)
  async createTrack(@Body() track: CreateTrackDto): Promise<Track> {
    return await this.trackService.createTrack(track);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() track: UpdateTrackDto,
  ): Promise<Track> {
    const updatedTrack = await this.trackService.updateTrack(id, track);
    if (!updatedTrack) {
      throw new NotFoundException('Album not found');
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    const track = await this.trackService.deleteTrack(id);

    if (!track) {
      throw new NotFoundException('Album not found');
    }
    return track;
  }
}
