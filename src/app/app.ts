import { DOCUMENT } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { routes } from './app.routes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageService, ThemeService } from './services';
import { IconComponent } from '@shyland-dev/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, IconComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  readonly navRoutes = routes.filter((r) => r.path && r.path !== '**');
  private readonly document = inject(DOCUMENT);
  private readonly teardownListeners: Array<() => void> = [];

  isOpenSideMenu = false;

  constructor(
    private debugService: DebugService,
    private router: Router,
    private storageService: StorageService,
    private translateService: TranslateService,
    private themeService: ThemeService,
  ) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
    this.ensureHomeForDefaultEntry('init');
    this.registerResumeFallback();

    const language = this.storageService.get('language') as string;
    this.debugService.log(this, 'language', language);

    if (language) {
      this.translateService.use(language);
    }

    this.themeService.init();
  }

  ngOnDestroy(): void {
    this.teardownListeners.forEach((teardown) => teardown());
    this.teardownListeners.length = 0;
  }

  setSideMenu(open: boolean): void {
    this.debugService.log(this, 'open', open);

    this.isOpenSideMenu = open;
  }

  private registerResumeFallback(): void {
    const win = this.document.defaultView;
    if (!win) {
      return;
    }

    const onPageShow = () => this.ensureHomeForDefaultEntry('pageshow');
    const onVisibilityChange = () => {
      if (this.document.visibilityState === 'visible') {
        this.ensureHomeForDefaultEntry('visibilitychange');
      }
    };

    win.addEventListener('pageshow', onPageShow);
    this.document.addEventListener('visibilitychange', onVisibilityChange);

    this.teardownListeners.push(
      () => win.removeEventListener('pageshow', onPageShow),
      () => this.document.removeEventListener('visibilitychange', onVisibilityChange),
    );
  }

  private ensureHomeForDefaultEntry(trigger: string): void {
    const pathname = this.document.defaultView?.location.pathname;
    if (!pathname || !this.isDefaultEntryPath(pathname)) {
      return;
    }

    this.debugService.log(this, 'redirect_default_entry', { trigger, pathname });
    void this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  private isDefaultEntryPath(pathname: string): boolean {
    const normalizedPathname = this.normalizePath(pathname);
    const basePath = this.getNormalizedBasePath();

    if (normalizedPathname === '/' || normalizedPathname === '/index.html') {
      return true;
    }

    if (basePath === '/') {
      return false;
    }

    return normalizedPathname === basePath || normalizedPathname === `${basePath}/index.html`;
  }

  private getNormalizedBasePath(): string {
    const baseHref = this.document.querySelector('base')?.getAttribute('href') ?? '/';
    return this.normalizePath(baseHref);
  }

  private normalizePath(path: string): string {
    const withoutOrigin = path.replace(/^https?:\/\/[^/]+/i, '');
    const withoutQueryHash = withoutOrigin.split(/[?#]/, 1)[0] ?? '/';
    const withLeadingSlash = withoutQueryHash.startsWith('/') ? withoutQueryHash : `/${withoutQueryHash}`;
    const trimmedTrailingSlashes = withLeadingSlash.replace(/\/+$/, '');

    return trimmedTrailingSlashes === '' ? '/' : trimmedTrailingSlashes;
  }
}
