import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistService } from '../artist/artist.service';
import { Artist } from '../model/artist.model';
import { AlbumService } from './album.service';
import { Album } from '../model/album.model';
import { SongService } from '../song/song.service';
import { Song } from '../model/song.model';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [AlbumService, ArtistService, SongService]
})
export class AlbumComponent implements OnInit {
  albums: Album[] = [];
  artists: Artist[] = [];
  songs: Song[] = [];
  selectedAlbum: Album | null = null;
  newAlbum: Album = {
    id: 0,
    title: '',
    releaseDate: new Date(),
    artistId: 0,
    songIds: []
  };

  constructor(private albumService: AlbumService, private artistService: ArtistService, private songService: SongService) {}

  ngOnInit(): void {
    this.loadAlbums();
    this.loadArtists();
    this.loadSongs();
  }

  loadAlbums(): void {
    this.albumService.getAllAlbums().subscribe((albums) => (this.albums = albums));
  }

  loadArtists(): void {
    this.artistService.getAllArtists().subscribe((artists) => (this.artists = artists));
  }

  loadSongs(): void {
    this.songService.getAllSongs().subscribe((songs) => (this.songs = songs));
  }

  getArtistName(artistId: number): string {
    const artist = this.artists.find(a => a.id === artistId);
    return artist ? artist.name : 'Unknown Artist';
  }

  getNumberOfSongs(albumId: number): number {
    return this.songs.filter(song => song.albumId === albumId).length;
  }

  selectAlbum(album: Album): void {
    this.selectedAlbum = album;
  }

  cancelEdit(): void {
    this.selectedAlbum = null;
  }

  updateAlbum(): void {
    if (this.selectedAlbum && this.selectedAlbum.id) {
      this.albumService.updateAlbum(this.selectedAlbum).subscribe(() => {
        this.loadAlbums();
        this.selectedAlbum = null;
      });
    }
  }

  deleteAlbum(id: number): void {
    this.albumService.deleteAlbum(id).subscribe(() => {
      this.loadAlbums();
      this.selectedAlbum = null;
    });
  }

  addAlbum(): void {
    this.albumService.addAlbum(this.newAlbum).subscribe(() => {
      this.loadAlbums();
      this.newAlbum = { id: 0, title: '', releaseDate: new Date(), artistId: 0, songIds: [] };
    });
  }
}
