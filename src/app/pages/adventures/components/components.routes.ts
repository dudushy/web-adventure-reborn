import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: '/adventures', pathMatch: 'full' },

  { path: 'select', loadComponent: () => import('./select/select').then((m) => m.Select) },

  { path: '**', redirectTo: '/adventures' },
] satisfies Routes;
