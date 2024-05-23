import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'artist', loadComponent: () => import('./artist/artist.component').then(m => m.ArtistComponent) },
  { path: 'songs', loadComponent: () => import('./song/song.component').then(m => m.SongComponent) },
  { path: 'albums', loadComponent: () => import('./album/album.component').then(m => m.AlbumComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
