import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'switch-frogs', pathMatch: 'full' },

  { path: 'switch-frogs', loadComponent: () => import('./switch-frogs/switch-frogs').then((m) => m.SwitchFrogs) },

  { path: '**', redirectTo: '/adventures' },
] satisfies Routes;
