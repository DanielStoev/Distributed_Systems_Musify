import { Artist } from './artist.model';

export interface Song {
  id: number;
  title: string;
  duration: number;
  artist: Artist;
  genre: string;
  releaseDate: Date;
}
