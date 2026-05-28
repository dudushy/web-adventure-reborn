import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: '/adventures', pathMatch: 'full' },
  { path: '**', redirectTo: '/adventures' },
] satisfies Routes;
