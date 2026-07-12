import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'war-adventure-random-tongue',
  imports: [TranslateModule],
  templateUrl: './tongue.html',
  styleUrl: './tongue.scss',
})
export class Tongue implements OnInit, OnDestroy {
  private debugService = inject(DebugService);

  isOpen: boolean | null = null;

  constructor() {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  toggleMouth(): void {
    this.debugService.log(this, '(BEFORE) this.isOpen', this.isOpen);

    this.isOpen = this.isOpen === null ? true : !this.isOpen;

    this.debugService.log(this, '(AFTER) this.isOpen', this.isOpen);
  }
}
