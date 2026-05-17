import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { routes } from './app.routes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageService, ThemeService } from './services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly navRoutes = routes.filter((r) => r.path && r.path !== '**');

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
}
