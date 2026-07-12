import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'war-adventure-loaders-startup',
  imports: [],
  templateUrl: './startup.html',
  styleUrl: './startup.scss',
})
export class Startup implements OnInit, OnDestroy {
  private debugService = inject(DebugService);

  constructor() {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }
}
