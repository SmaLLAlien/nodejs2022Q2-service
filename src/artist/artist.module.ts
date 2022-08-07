import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
  imports: [TypeOrmModule.forFeature([Artist])],
})
export class ArtistModule {}
