import { ThemesType } from '../types';

export const THEMES: ThemesType[] = [
  { code: 'light', nameKey: 'themes.light', background: '#ffffff', color: '#000000', highlight: '#ffc409' },
  { code: 'dark', nameKey: 'themes.dark', background: '#000000', color: '#ffffff', highlight: '#ffc409', isDefault: true },
  { code: 'custom', nameKey: 'themes.custom', background: '#000000', color: '#ffffff', highlight: '#ffc409' },
];
