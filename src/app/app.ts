import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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

  isOpenSideMenu = false;

  constructor(
    private debugService: DebugService,
    private storageService: StorageService,
    private translateService: TranslateService,
    private themeService: ThemeService,
  ) {
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
}
