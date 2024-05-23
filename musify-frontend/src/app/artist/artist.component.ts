import { Component, OnInit } from '@angular/core';
import { ArtistService } from './artist.service';
import { Artist } from '../model/artist.model';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-artist',
  standalone: true,
  templateUrl: './artist.component.html',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    HttpClientModule
  ],
  styleUrl: './artist.component.css',
  providers: [ArtistService]
})
export class ArtistComponent implements OnInit {
  artists: Artist[] = [];
  selectedArtist: Artist | null = null;
  newArtist: Artist = {
    id: 0,
    name: '',
    songs: [],
    albums: [],
    country: '',
    birthDate: new Date()
  };

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
    this.artistService.getAllArtists().subscribe({
      next: (data) => {
        this.artists = data;
      }
    });
  }

  selectArtist(artist: Artist): void {
    this.selectedArtist = artist;
  }

  addArtist(): void {
    this.artistService.addArtist(this.newArtist).subscribe({
      next: () => {
        this.newArtist = {
          id: 0,
          name: '',
          songs: [],
          albums: [],
          country: '',
          birthDate: new Date()
        };
      }
    });
  }

  updateArtist(): void {
    if (this.selectedArtist) {
      this.artistService.updateArtist(this.selectedArtist).subscribe({
        next: () => {
          this.loadArtists();
        }
      });
    }
  }

  deleteArtist(id: number): void {
    this.artistService.deleteArtist(id).subscribe({
      next: () => {
        this.loadArtists();
        this.selectedArtist = null;
      }
    });
  }
}
