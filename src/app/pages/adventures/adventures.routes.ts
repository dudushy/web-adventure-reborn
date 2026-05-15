import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./adventures').then((m) => m.Adventures) },
  { path: 'clone', loadChildren: () => import('./clone/clone.routes') },
  { path: 'form', loadChildren: () => import('./form/form.routes') },
  { path: 'game', loadChildren: () => import('./game/game.routes') },
  { path: 'interactive', loadChildren: () => import('./interactive/interactive.routes') },
  { path: 'loader', loadChildren: () => import('./loader/loader.routes') },
  { path: 'random', loadChildren: () => import('./random/random.routes') },
  { path: '**', redirectTo: '' },
] satisfies Routes;
