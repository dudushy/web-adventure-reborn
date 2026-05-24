import { AdventuresType } from '../types';

export const ADVENTURES: AdventuresType[] = [
  {
    slug: 'startup',
    category: 'loaders',
    status: 'done',
    descriptionKey: 'adventures.loaders.startup.description',
    path: '/adventures/loaders/startup',
  },
  {
    slug: 'tongue',
    category: 'random',
    status: 'done',
    descriptionKey: 'adventures.random.tongue.description',
    path: '/adventures/random/tongue',
  },
  {
    slug: 'frog',
    category: 'random',
    status: 'wip',
    descriptionKey: 'adventures.random.frog.description',
    path: '/adventures/random/frog',
  },
];
