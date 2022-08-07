import { Module } from '@nestjs/common';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
  imports: [TypeOrmModule.forFeature([Album]), LoggerModule],
})
export class AlbumModule {}
