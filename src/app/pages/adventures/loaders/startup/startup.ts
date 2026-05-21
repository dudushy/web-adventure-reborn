import { Component, OnDestroy, OnInit } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'app-adventure-loader-startup',
  imports: [],
  templateUrl: './startup.html',
  styleUrl: './startup.scss',
})
export class Startup implements OnInit, OnDestroy {
  constructor(private debugService: DebugService) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }
}
