import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DebugService } from '@shyland-dev/utils';
import { LANGUAGES, THEMES } from '../../consts';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageService, ThemeService } from '../../services';
import { SelectComponent, SelectOption, SelectionChangeEvent } from '@shyland-dev/ui';

@Component({
  selector: 'app-preferences',
  imports: [FormsModule, TranslateModule, SelectComponent, TranslateModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
})
export class Preferences implements OnInit, OnDestroy {
  languageArray: SelectOption[] = LANGUAGES.map((language, index) => ({
    id: index,
    label: language.name,
    value: language.code,
    img: language.img,
  }));
  selectedLanguage: string | null = null;

  themeArray: SelectOption[] = [];
  selectedTheme: string | null = null;

  private langChangeSub!: Subscription;

  constructor(
    private debugService: DebugService,
    private translateService: TranslateService,
    private storageService: StorageService,
    private themeService: ThemeService,
  ) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);

    this.selectedLanguage = this.storageService.get('language') || this.translateService.getCurrentLang();
    this.debugService.log(this, 'this.selectedLanguage', this.selectedLanguage);

    this.selectedTheme = this.themeService.getCurrentTheme();
    this.debugService.log(this, 'this.selectedTheme', this.selectedTheme);

    this.buildThemeArray();
    this.langChangeSub = this.translateService.onLangChange.subscribe(() => this.buildThemeArray());
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
    this.langChangeSub?.unsubscribe();
  }

  private buildThemeArray(): void {
    this.themeArray = THEMES.map((theme, index) => ({
      id: index,
      label: this.translateService.instant(`themes.${theme.code}`),
      value: theme.code,
    }));
  }

  updateLanguage(event: SelectionChangeEvent): void {
    this.debugService.log(this, 'event', event);
    this.debugService.log(this, 'this.selectedLanguage', this.selectedLanguage);

    if (event && event.selectedOption) {
      this.selectedLanguage = event.selectedOption.value;
    }

    if (this.selectedLanguage) {
      this.translateService.use(this.selectedLanguage);
      this.storageService.set('language', this.selectedLanguage);
    }
  }

  updateTheme(event: SelectionChangeEvent): void {
    this.debugService.log(this, 'event', event);
    this.debugService.log(this, 'this.selectedTheme', this.selectedTheme);

    if (event && event.selectedOption) {
      this.selectedTheme = event.selectedOption.value;
    }

    if (this.selectedTheme) {
      this.themeService.setTheme(this.selectedTheme);
    }
  }
}
