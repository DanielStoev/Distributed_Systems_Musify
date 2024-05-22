import { Album } from './album.model';
import { Song } from './song.model';

export interface Artist {
  id: number;
  name: string;
  songs: Song[];
  albums: Album[];
  country: string;
  birthDate: Date;
}
