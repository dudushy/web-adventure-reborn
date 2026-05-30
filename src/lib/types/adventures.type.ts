export type AdventuresType = {
  slug: string;
  category: AdventuresCategoriesType;
  status: AdventuresStatusType;
  descriptionKey: string;
  path: string;
};

export type AdventuresCategoriesType = 'clones' | 'components' | 'forms' | 'games' | 'interactive' | 'loaders' | 'random';

export type AdventuresStatusType = 'wip' | 'done' | 'rework';
