import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'app-adventure-random-frog',
  imports: [TranslateModule],
  templateUrl: './frog.html',
  styleUrl: './frog.scss',
})
export class Frog implements OnInit, OnDestroy {
  isTongueOut: boolean | null = null;

  constructor(private debugService: DebugService) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  toggleTongue(): void {
    this.debugService.log(this, '(BEFORE) this.isTongueOut', this.isTongueOut);

    this.isTongueOut = this.isTongueOut === null ? true : !this.isTongueOut;

    this.debugService.log(this, '(AFTER) this.isTongueOut', this.isTongueOut);
  }
}
