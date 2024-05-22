import { Artist } from './artist.model';
import { Song } from './song.model';

export interface Album {
  id: number;
  title: string;
  numberOfSongs: number;
  releaseDate: Date;
  artist: Artist;
  songs: Song[];
}
