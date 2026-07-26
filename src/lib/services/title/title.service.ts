import { Injectable, inject } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { TITLE_PREFIX } from '../../constants';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private debugService = inject(DebugService);

  constructor() {
    this.debugService.log(this);
  }

  setTitle(title: string): void {
    this.debugService.log(this, 'title', title);

    const documentTitle = `${TITLE_PREFIX}${title}`;
    this.debugService.log(this, 'documentTitle', documentTitle);

    document.title = documentTitle;
  }
}
