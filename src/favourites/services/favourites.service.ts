import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavouritesRepository } from '../repository/favourites.repository';
import { ArtistService } from '../../artist/services/artist.service';
import { FavouritesEntity } from '../favourites.entity';
import { AlbumService } from '../../album/services/album.service';
import { TrackService } from '../../track/services/track.service';
import { Track } from '../../track/track.entity';
import { Album } from '../../album/album.entity';
import { Artist } from '../../artist/artist.entity';

@Injectable()
export class FavouritesService {
  constructor(
    private favsRepository: FavouritesRepository,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async getAllFavourites() {
    const favourites: FavouritesEntity = this.favsRepository.getAllFavourites();
    const artists = await this.getAllArtistsById(favourites.artists);
    const albums = await this.getAllAlbumsById(favourites.albums);
    const tracks = await this.getAllTracksById(favourites.tracks);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addArtist(artistId: string) {
    const isArtistExist = await this.isArtistExist(artistId);
    if (!isArtistExist) {
      return null;
    }

    return this.favsRepository.addArtist(artistId);
  }

  async deleteArtist(artistId: string) {
    const isArtistExist = await this.isArtistExist(artistId);
    if (!isArtistExist) {
      return null;
    }

    return this.favsRepository.deleteArtist(artistId);
  }

  async addTrack(trackId: string) {
    const isTrackExist = await this.isTrackExist(trackId);
    if (!isTrackExist) {
      return null;
    }

    return this.favsRepository.addTrack(trackId);
  }

  async deleteTrack(trackId: string) {
    const isTrackExist = await this.isTrackExist(trackId);
    if (!isTrackExist) {
      return null;
    }

    return this.favsRepository.deleteTrack(trackId);
  }

  async addAlbum(albumId: string) {
    const isAlbumExist = await this.isAlbumExist(albumId);
    if (!isAlbumExist) {
      return null;
    }

    return this.favsRepository.addAlbum(albumId);
  }

  async deleteAlbum(albumId: string) {
    const isAlbumExist = await this.isAlbumExist(albumId);
    if (!isAlbumExist) {
      return null;
    }

    return this.favsRepository.deleteAlbum(albumId);
  }

  private async isArtistExist(artistId: string): Promise<boolean> {
    const artist = await this.artistService.getOne(artistId);
    return !!artist;
  }

  private async isTrackExist(trackId: string) {
    const track = await this.trackService.getOne(trackId);
    return !!track;
  }

  private async isAlbumExist(albumId: string) {
    const album = await this.albumService.getOne(albumId);
    return !!album;
  }

  private async getAllArtistsById(artistIds: string[]): Promise<Artist[]> {
    let artists = [];
    try {
      artists = await Promise.all(
        artistIds.map((id) => this.artistService.getOne(id)),
      );
      return artists;
    } catch (e) {
      console.log(`Could not get artists. [Error]: ${e.message}`);
      return [];
    }
  }

  private async getAllAlbumsById(albumIds: string[]): Promise<Album[]> {
    let albums = [];
    try {
      albums = await Promise.all(
        albumIds.map((id) => this.albumService.getOne(id)),
      );
      return albums;
    } catch (e) {
      console.log(`Could not get albums. [Error]: ${e.message}`);
      return [];
    }
  }

  private async getAllTracksById(trackIds: string[]): Promise<Track[]> {
    let tracks = [];
    try {
      tracks = await Promise.all(
        trackIds.map((id) => this.trackService.getOne(id)),
      );

      return tracks;
    } catch (e) {
      console.log(`Could not get tracks. [Error]: ${e.message}`);
      return [];
    }
  }
}
