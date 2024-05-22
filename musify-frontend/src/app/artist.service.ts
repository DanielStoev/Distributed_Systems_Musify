import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from './artist.model'; // Define this model according to your Artist entity

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:8080/api/artists';

  constructor(private http: HttpClient) {}

  getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`);
  }

  getArtistByName(name: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${name}`);
  }

  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(this.apiUrl, artist);
  }

  deleteArtist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
