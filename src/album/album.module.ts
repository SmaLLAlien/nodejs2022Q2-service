import { Module } from '@nestjs/common';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { AlbumRepository } from './repository/album.repository';

@Module({
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
})
export class AlbumModule {}
