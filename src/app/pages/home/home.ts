import { Component, OnDestroy, OnInit } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { IconComponent } from '@shyland-dev/ui';
import { TranslateModule } from '@ngx-translate/core';
import { TOPICS } from '../../consts';
import { TitleService } from '../../services';

@Component({
  selector: 'app-home',
  imports: [IconComponent, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  readonly topics = TOPICS;

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
}
