import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'hover-buttons', pathMatch: 'full' },

  { path: 'hover-buttons', loadComponent: () => import('./hover-buttons/hover-buttons').then((m) => m.HoverButtons) },

  { path: '**', redirectTo: '/adventures' },
] satisfies Routes;
