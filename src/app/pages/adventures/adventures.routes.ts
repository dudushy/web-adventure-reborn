import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./adventures').then((m) => m.Adventures) },
  { path: 'clones', loadChildren: () => import('./clones/clones.routes') },
  { path: 'forms', loadChildren: () => import('./forms/forms.routes') },
  { path: 'games', loadChildren: () => import('./games/games.routes') },
  { path: 'interactives', loadChildren: () => import('./interactives/interactives.routes') },
  { path: 'loaders', loadChildren: () => import('./loaders/loaders.routes') },
  { path: 'random', loadChildren: () => import('./random/random.routes') },
  { path: '**', redirectTo: '' },
] satisfies Routes;
