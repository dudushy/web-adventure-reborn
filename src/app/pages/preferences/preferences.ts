import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { LANGUAGES } from '../../consts/languages.const';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services';

@Component({
  selector: 'app-preferences',
  imports: [FormsModule, TranslateModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
})
export class Preferences implements OnInit, OnDestroy {
  readonly languages = LANGUAGES;
  selectedLanguage: string | null = null;

  // isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(
    private debugService: DebugService,
    private translateService: TranslateService,
    private storageService: StorageService,
  ) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);

    this.selectedLanguage = this.storageService.get('language') || this.translateService.getCurrentLang();
    this.debugService.log(this, 'this.selectedLanguage', this.selectedLanguage);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  updateLanguage(): void {
    this.debugService.log(this, 'this.selectedLanguage', this.selectedLanguage);

    if (this.selectedLanguage) {
      this.translateService.use(this.selectedLanguage);
      this.storageService.set('language', this.selectedLanguage);
    }
  }
}
