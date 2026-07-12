import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { IconComponent } from '@shyland-dev/ui';
import { TranslateModule } from '@ngx-translate/core';
import { TOPICS, TitleService } from '@web-adventure-reborn';

@Component({
  selector: 'war-home',
  imports: [IconComponent, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private debugService = inject(DebugService);
  private titleService = inject(TitleService);

  readonly title = 'Home';
  readonly topics = TOPICS;

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
}
