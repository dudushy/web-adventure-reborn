import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { routes } from './app.routes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageService, ThemeService, APP_VERSION } from '@web-adventure-reborn';
import { IconComponent } from '@shyland-dev/ui';

@Component({
  selector: 'war-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, IconComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private debugService = inject(DebugService);
  private storageService = inject(StorageService);
  private translateService = inject(TranslateService);
  private themeService = inject(ThemeService);

  readonly navRoutes = routes.filter((r) => r.path && r.path !== '**');
  readonly version = APP_VERSION;

  isOpenSideMenu = false;

  constructor() {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);

    const language = this.storageService.get('language') as string;
    this.debugService.log(this, 'language', language);

    if (language) {
      this.translateService.use(language);
    }

    this.themeService.init();
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  setSideMenu(open: boolean): void {
    this.debugService.log(this, 'open', open);

    this.isOpenSideMenu = open;
  }

  onSideMenuBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.setSideMenu(false);
    }
  }
}
