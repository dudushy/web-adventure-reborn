import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'startup', pathMatch: 'full' },

  { path: 'startup', loadComponent: () => import('./startup/startup').then((m) => m.Startup) },

  { path: '**', redirectTo: '/adventures' },
] satisfies Routes;
