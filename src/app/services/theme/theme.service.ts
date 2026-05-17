import { Injectable } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { THEMES } from '../../consts';
import { StorageService } from '../../services';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(
    private debugService: DebugService,
    private storageService: StorageService,
  ) {
    this.debugService.log(this);
  }

  init(): void {
    this.debugService.log(this);
    this.getCurrentTheme();
  }

  setTheme(theme: string): void {
    this.debugService.log(this, 'theme', theme);

    const foundTheme = THEMES.find((t) => t.code === theme);
    if (foundTheme) {
      document.documentElement.style.setProperty('--theme', foundTheme.code);
      document.documentElement.style.setProperty('--theme-background', foundTheme.background);
      document.documentElement.style.setProperty('--theme-color', foundTheme.color);
      document.documentElement.setAttribute('data-theme', foundTheme.code);
      this.storageService.set('theme', theme);
    }
  }

  getCurrentTheme(): string | null {
    const storedTheme = this.storageService.get('theme') as string | null;
    this.debugService.log(this, 'storedTheme', storedTheme);

    if (storedTheme) {
      this.setTheme(storedTheme);
      return storedTheme;
    }

    const defaultTheme = THEMES.find((t) => t.isDefault);
    this.debugService.log(this, 'defaultTheme', defaultTheme);

    if (defaultTheme) {
      this.setTheme(defaultTheme.code);
    }

    return defaultTheme ? defaultTheme.code : null;
  }
}
