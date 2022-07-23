import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from '../../artist/services/artist.service';
import { FavouritesEntity } from '../favourites.entity';
import { AlbumService } from '../../album/services/album.service';
import { TrackService } from '../../track/services/track.service';
import { Track } from '../../track/track.entity';
import { Album } from '../../album/album.entity';
import { Artist } from '../../artist/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavouritesService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,

    @InjectRepository(FavouritesEntity)
    private favsRepos: Repository<FavouritesEntity>,
  ) {}

  async getAllFavourites() {
    let favourites = await this.favsRepos.findOne({ where: {} });

    if (!favourites) {
      favourites = this.favsRepos.create({
        artists: [],
        albums: [],
        tracks: [],
      });

      return favourites;
    }
    return await this.favsRepos.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });
  }

  async getFavourite() {
    let favourites = await this.favsRepos.findOne({ where: {} });
    if (!favourites) {
      favourites = this.favsRepos.create({
        artists: [],
        albums: [],
        tracks: [],
      });
    }

    return favourites;
  }

  async addArtist(artistId: string) {
    const artist: Artist = await this.isArtistExist(artistId);
    if (!artist) {
      return null;
    }

    const favourites = await this.getAllFavourites();
    favourites.artists.push(artist);

    return await this.favsRepos.save(favourites);
  }

  async deleteArtist(artistId: string) {
    const artist: Artist = await this.isArtistExist(artistId);
    if (!artist) {
      return null;
    }

    const favourites = await this.getAllFavourites();
    favourites.artists = favourites.artists.filter((a) => a.id !== artistId);

    return await this.favsRepos.save(favourites);
  }

  async addTrack(trackId: string) {
    const track: Track = await this.isTrackExist(trackId);
    if (!track) {
      return null;
    }

    const favourites = await this.getAllFavourites();
    favourites.tracks.push(track);

    return await this.favsRepos.save(favourites);
  }

  async deleteTrack(trackId: string) {
    const track: Track = await this.isTrackExist(trackId);
    if (!track) {
      return null;
    }

    const favourites = await this.getAllFavourites();
    favourites.tracks = favourites.tracks.filter((t) => t.id !== trackId);

    return this.favsRepos.save(favourites);
  }

  async addAlbum(albumId: string) {
    const album: Album = await this.isAlbumExist(albumId);
    if (!album) {
      return null;
    }

    const favourites = await this.getAllFavourites();
    favourites.albums.push(album);

    return this.favsRepos.save(favourites);
  }

  async deleteAlbum(albumId: string) {
    const album: Album = await this.isAlbumExist(albumId);
    if (!album) {
      return null;
    }

    const favourites = await this.getAllFavourites();
    favourites.albums = favourites.albums.filter((a) => a.id !== albumId);

    return this.favsRepos.save(favourites);
  }

  private async isArtistExist(artistId: string): Promise<Artist> {
    const artist = await this.artistService.getOne(artistId);
    return artist;
  }

  private async isTrackExist(trackId: string): Promise<Track> {
    const track = await this.trackService.getOne(trackId);
    return track;
  }

  private async isAlbumExist(albumId: string): Promise<Album> {
    const album = await this.albumService.getOne(albumId);
    return album;
  }
}
