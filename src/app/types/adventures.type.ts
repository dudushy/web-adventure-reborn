export type AdventuresType = {
  title: string;
  slug: string;
  category: AdventuresCategoriesType;
  path: string;
  status?: AdventuresStatusType;
};

export type AdventuresCategoriesType = 'clone' | 'form' | 'game' | 'interactive' | 'loader' | 'random';

export type AdventuresStatusType = 'wip' | 'done' | 'rework';
