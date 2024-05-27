export interface Album {
  id: number;
  title: string;
  numberOfSongs: number;
  releaseDate: Date;
  artistId: number;
  songIds: number[];
}
