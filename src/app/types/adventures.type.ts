export type AdventuresType = {
  title: string;
  slug: string;
  category: string;
  path: string;
  status?: 'wip' | 'done' | 'rework';
}
