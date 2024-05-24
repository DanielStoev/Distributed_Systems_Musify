import { Component, OnInit } from '@angular/core';
import { AlbumService } from './album.service';
import { Album } from '../model/album.model';
import { Artist } from '../model/artist.model';
import { ArtistService } from '../artist/artist.service';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-album',
  standalone: true,
  templateUrl: './album.component.html',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    HttpClientModule
  ],
  styleUrl: './album.component.css',
  providers: [AlbumService, ArtistService]
})
export class AlbumComponent implements OnInit {
  albums: Album[] = [];
  artists: Artist[] = [];
  selectedAlbum: Album | null = null;
  newAlbum: Album = {
    id: 0,
    title: '',
    numberOfSongs: 0,
    releaseDate: new Date(),
    artist: { id: 0, name: '', country: '', birthDate: new Date(), songs: [], albums: [] },
    songs: []
  };

  constructor(private albumService: AlbumService, private artistService: ArtistService) {}

  ngOnInit(): void {
    this.loadAlbums();
    this.loadArtists();
  }

  loadAlbums(): void {
    this.albumService.getAllAlbums().subscribe({
      next: (data) => {
        this.albums = data;
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

  selectAlbum(album: Album): void {
    this.selectedAlbum = album;
  }

  addAlbum(): void {
    const selectedArtist = this.artists.find(artist => artist.id === this.newAlbum.artist.id);

    if (selectedArtist) {
      this.newAlbum.artist = selectedArtist;
    }

    this.albumService.addAlbum(this.newAlbum).subscribe({
      next: () => {
        this.loadAlbums();
        this.newAlbum = {
          id: 0,
          title: '',
          numberOfSongs: 0,
          releaseDate: new Date(),
          artist: { id: 0, name: '', country: '', birthDate: new Date(), songs: [], albums: [] },
          songs: []
        };
      }
    });
  }

  updateAlbum(): void {
    if (this.selectedAlbum) {
      this.albumService.updateAlbum(this.selectedAlbum).subscribe({
        next: () => {
          this.loadAlbums();
        }
      });
    }
  }

  deleteAlbum(id: number): void {
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.loadAlbums();
        this.selectedAlbum = null;
      }
    });
  }
}
