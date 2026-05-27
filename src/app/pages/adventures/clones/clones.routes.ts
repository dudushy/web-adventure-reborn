import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'spotify-player', pathMatch: 'full' },
  { path: 'spotify-player', loadComponent: () => import('./spotify-player/spotify-player').then((m) => m.SpotifyPlayer) },
] satisfies Routes;
