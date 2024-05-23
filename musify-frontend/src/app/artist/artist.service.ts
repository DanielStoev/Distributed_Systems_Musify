import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../model/artist.model';
import {HttpClient} from "@angular/common/http";

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
    return this.http.get<Artist>(`${this.apiUrl}?name=${name}`);
  }

  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/${artist.id}`, artist);
  }

  deleteArtist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
