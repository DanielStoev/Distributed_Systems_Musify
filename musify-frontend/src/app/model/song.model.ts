import { Artist } from './artist.model';
import {Album} from "./album.model";

export interface Song {
  id: number;
  title: string;
  duration: number;
  artist: Artist;
  album: Album;
  genre: string;
  releaseDate: Date;
}
