import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DebugService } from '@shyland-dev/utils';
import { LANGUAGES, THEMES, StorageService, ThemeService, TitleService } from '@web-adventure-reborn';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectComponent, SelectOption, SelectionChangeEvent } from '@shyland-dev/ui';

@Component({
  selector: 'war-preferences',
  imports: [FormsModule, TranslateModule, SelectComponent, TranslateModule],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
})
export class Preferences implements OnInit, OnDestroy {
  private debugService = inject(DebugService);
  private translateService = inject(TranslateService);
  private storageService = inject(StorageService);
  private themeService = inject(ThemeService);
  private titleService = inject(TitleService);

  readonly title = 'Preferences';

  languageArray: SelectOption[] = LANGUAGES.map((language, index) => ({
    id: index,
    label: language.name,
    value: language.code,
    img: language.img,
  }));
  selectedLanguage: string | null = null;

  themeArray: SelectOption[] = [];
  selectedTheme: string | null = null;
  customThemeBackground = '';
  customThemeColor = '';
  customThemeHighlight = '';
  private langChangeSub!: Subscription;

  constructor() {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);

    this.titleService.setTitle(this.title);

    this.selectedLanguage = this.storageService.get('language') || this.translateService.getCurrentLang();
    this.debugService.log(this, 'this.selectedLanguage', this.selectedLanguage);

    this.selectedTheme = this.themeService.getCurrentTheme();
    this.debugService.log(this, 'this.selectedTheme', this.selectedTheme);

    this.customThemeBackground = this.storageService.get('customThemeBackground') || '';
    this.customThemeColor = this.storageService.get('customThemeColor') || '';
    this.customThemeHighlight = this.storageService.get('customThemeHighlight') || '';

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
      label: this.translateService.instant(theme.nameKey),
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

  updateCustomThemeBackground(event: Event): void {
    this.customThemeBackground = this.getColorPickerValue(event);
    this.themeService.setCustomThemeBackground(this.customThemeBackground);
  }

  updateCustomThemeColor(event: Event): void {
    this.customThemeColor = this.getColorPickerValue(event);
    this.themeService.setCustomThemeColor(this.customThemeColor);
  }

  updateCustomThemeHighlight(event: Event): void {
    this.customThemeHighlight = this.getColorPickerValue(event);
    this.themeService.setCustomThemeHighlight(this.customThemeHighlight);
  }

  private getColorPickerValue(event: Event): string {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new TypeError('Color picker event target must be an HTMLInputElement.');
    }

    return event.target.value;
  }
}
