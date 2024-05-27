import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArtistService } from './artist.service';
import { Artist } from '../model/artist.model';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, HttpClientModule],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers: [ArtistService]
})
export class ArtistComponent implements OnInit {
  artists: Artist[] = [];
  selectedArtist: Artist | null = null;
  newArtist: Artist = {
    id: 0,
    name: '',
    songIds: [],
    albumIds: [],
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

  cancelEdit(): void {
    this.selectedArtist = null;
  }

  addArtist(): void {
    this.artistService.addArtist(this.newArtist).subscribe({
      next: () => {
        this.loadArtists();
        this.newArtist = {
          id: 0,
          name: '',
          songIds: [],
          albumIds: [],
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
          this.selectedArtist = null;
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
