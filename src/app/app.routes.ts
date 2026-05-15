import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'adventures', loadChildren: () => import('./pages/adventures/adventures.routes') },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
