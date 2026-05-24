import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'tongue', pathMatch: 'full' },

  { path: 'tongue', loadComponent: () => import('./tongue/tongue').then((m) => m.Tongue) },
  { path: 'frog', loadComponent: () => import('./frog/frog').then((m) => m.Frog) },
] satisfies Routes;
