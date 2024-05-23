import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent {
}
