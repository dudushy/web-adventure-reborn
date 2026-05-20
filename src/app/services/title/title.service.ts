import { Injectable } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { TITLE_PREFIX } from '../../consts';

@Injectable({ providedIn: 'root' })
export class TitleService {
  constructor(private debugService: DebugService) {
    this.debugService.log(this);
  }

  setTitle(instance: object): void {
    this.debugService.log(this, 'instance', instance);

    const title = instance.constructor.name.replace('_', '');
    this.debugService.log(this, 'title', title);

    const documentTitle = `${TITLE_PREFIX}${title}`;
    this.debugService.log(this, 'documentTitle', documentTitle);

    document.title = documentTitle;
  }
}
