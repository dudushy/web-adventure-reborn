export type AdventuresType = {
  titleKey: string;
  slug: string;
  category: AdventuresCategoriesType;
  status: AdventuresStatusType;
  descriptionKey: string;
  path: string;
};

export type AdventuresCategoriesType = 'clone' | 'form' | 'game' | 'interactive' | 'loader' | 'random';

export type AdventuresStatusType = 'wip' | 'done' | 'rework';
