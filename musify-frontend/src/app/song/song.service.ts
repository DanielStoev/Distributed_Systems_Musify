import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../model/song.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = 'http://localhost:8080/api/songs';

  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/${id}`);
  }

  getSongByTitle(title: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/title/${title}`);
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.apiUrl, song);
  }

  updateSong(song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.apiUrl}/${song.id}`, song);
  }

  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
