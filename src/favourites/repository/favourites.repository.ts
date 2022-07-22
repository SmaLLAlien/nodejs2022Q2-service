import { Injectable } from '@nestjs/common';
import { FavouritesEntity } from '../favourites.entity';

@Injectable()
export class FavouritesRepository {
  // private favourites: FavouritesEntity = {
  //   artists: [],
  //   albums: [],
  //   tracks: [],
  // };
  //
  // getAllFavourites(): FavouritesEntity {
  //   return this.favourites;
  // }
  //
  // addArtist(artistId: string) {
  //   this.favourites.artists.push(artistId);
  //   return artistId;
  // }
  //
  // addTrack(trackId: string) {
  //   this.favourites.tracks.push(trackId);
  //   return trackId;
  // }
  //
  // addAlbum(albumId: string) {
  //   this.favourites.albums.push(albumId);
  //   return albumId;
  // }
  //
  // deleteArtist(artistId: string) {
  //   this.favourites.artists = this.favourites.artists.filter(
  //     (id) => id !== artistId,
  //   );
  //   return artistId;
  // }
  //
  // deleteAlbum(albumId: string) {
  //   this.favourites.albums = this.favourites.albums.filter(
  //     (id) => id !== albumId,
  //   );
  //   return albumId;
  // }
  //
  // deleteTrack(trackId: string) {
  //   this.favourites.tracks = this.favourites.tracks.filter(
  //     (id) => id !== trackId,
  //   );
  //   return trackId;
  // }
}
