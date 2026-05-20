import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { ADVENTURES } from '../../consts';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@shyland-dev/ui';
import { AdventuresStatusType } from '../../types';
import { TitleService } from '../../services';

@Component({
  selector: 'app-adventures',
  imports: [RouterLink, TranslateModule, IconComponent],
  templateUrl: './adventures.html',
  styleUrl: './adventures.scss',
})
export class Adventures implements OnInit, OnDestroy {
  readonly adventures = ADVENTURES;

  constructor(
    private debugService: DebugService,
    private titleService: TitleService,
  ) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);

    this.titleService.setTitle(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  getStatusIcon(status: AdventuresStatusType): string {
    switch (status) {
      case 'wip':
        return 'hourglass';
      case 'done':
        return 'check';
      case 'rework':
        return 'refresh';
      default:
        return '';
    }
  }
}
