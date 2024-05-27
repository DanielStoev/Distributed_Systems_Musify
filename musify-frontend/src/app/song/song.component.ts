import { Component, OnInit } from '@angular/core';
import { SongService } from './song.service';
import { Song } from '../model/song.model';
import { Artist } from '../model/artist.model';
import { Album } from '../model/album.model';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-song',
  standalone: true,
  templateUrl: './song.component.html',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    HttpClientModule
  ],
  styleUrl: './song.component.css',
  providers: [SongService, ArtistService, AlbumService]
})
export class SongComponent implements OnInit {
  songs: Song[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  selectedSong: Song | null = null;
  newSong: Song = {
    id: 0,
    title: '',
    duration: 0,
    albumId: -1,
    artistId: -1,
    genre: '',
    releaseDate: new Date()
  };

  constructor(
    private songService: SongService,
    private artistService: ArtistService,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.loadSongs();
    this.loadArtists();
    this.loadAlbums();
  }

  loadSongs(): void {
    this.songService.getAllSongs().subscribe({
      next: (data) => {
        this.songs = data;
      }
    });
  }

  loadArtists(): void {
    this.artistService.getAllArtists().subscribe({
      next: (data) => {
        this.artists = data;
      }
    });
  }

  loadAlbums(): void {
    this.albumService.getAllAlbums().subscribe({
      next: (data) => {
        this.albums = data;
      }
    });
  }

  selectSong(song: Song): void {
    this.selectedSong = song;
  }

  addSong(): void {
    const selectedArtist = this.artists.find(artist => artist.id === this.newSong.artistId);
    const selectedAlbum = this.albums.find(album => album.id === this.newSong.albumId);

    if (selectedArtist) {
      this.newSong.artistId = selectedArtist.id;
    }

    if (selectedAlbum) {
      this.newSong.albumId = selectedAlbum.id;
    }

    this.songService.addSong(this.newSong).subscribe({
      next: () => {
        this.loadSongs();
        this.newSong = {
          id: 0,
          title: '',
          duration: 0,
          albumId: -1,
          artistId: -1,
          genre: '',
          releaseDate: new Date()
        };
      }
    });
  }

  updateSong(): void {
    if (this.selectedSong) {
      this.songService.updateSong(this.selectedSong).subscribe({
        next: () => {
          this.loadSongs();
        }
      });
    }
  }

  deleteSong(id: number): void {
    this.songService.deleteSong(id).subscribe({
      next: () => {
        this.loadSongs();
        this.selectedSong = null;
      }
    });
  }
}
