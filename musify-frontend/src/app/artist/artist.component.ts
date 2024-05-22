import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import {Artist} from "../model/artist.model";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artists: Artist[] = [];
  selectedArtist?: Artist;
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
    this.artistService.getAllArtists().subscribe((data) => {
      this.artists = data;
    });
  }

  selectArtist(artist: Artist): void {
    this.selectedArtist = artist;
  }

  addArtist(): void {
    this.artistService.addArtist(this.newArtist).subscribe(() => {
      this.loadArtists();
      this.newArtist = {
        id: 0,
        name: '',
        songs: [],
        albums: [],
        country: '',
        birthDate: new Date()
      };
    });
  }

  updateArtist(): void {
    if (this.selectedArtist) {
      this.artistService.updateArtist(this.selectedArtist).subscribe(() => {
        this.loadArtists();
      });
    }
  }

  deleteArtist(id: number): void {
    this.artistService.deleteArtist(id).subscribe(() => {
      this.loadArtists();
    });
  }
}
