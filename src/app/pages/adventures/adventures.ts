import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@shyland-dev/ui';
import { AdventuresStatusType, TitleService, ADVENTURES } from '@web-adventure-reborn';
import { NgClass } from '@angular/common';

@Component({
  selector: 'war-adventures',
  imports: [RouterLink, TranslateModule, IconComponent, NgClass],
  templateUrl: './adventures.html',
  styleUrl: './adventures.scss',
})
export class Adventures implements OnInit, OnDestroy {
  private debugService = inject(DebugService);
  private titleService = inject(TitleService);

  readonly title = 'Adventures';
  readonly adventures = ADVENTURES;

  constructor() {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);

    this.titleService.setTitle(this.title);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  getStatusIcon(status: AdventuresStatusType): string {
    switch (status) {
      case 'planned':
        return 'clock-fill';
      case 'wip':
        return 'exclamation-triangle-fill';
      case 'done':
        return 'check-circle-fill';
      case 'rework':
        return 'wrench-adjustable';
      default:
        return 'question-circle-fill';
    }
  }
}
