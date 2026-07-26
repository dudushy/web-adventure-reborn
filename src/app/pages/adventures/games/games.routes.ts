import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'switch-frogs', pathMatch: 'full' },

  { path: 'switch-frogs', loadComponent: () => import('./switch-frogs/switch-frogs').then((m) => m.SwitchFrogs) },
  { path: 'ultimate-tic-tac-toe', loadComponent: () => import('./ultimate-tic-tac-toe/ultimate-tic-tac-toe').then((m) => m.UltimateTicTacToe) },

  { path: '**', redirectTo: '/adventures' },
] satisfies Routes;
