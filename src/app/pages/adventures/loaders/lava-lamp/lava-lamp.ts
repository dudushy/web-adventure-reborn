import { Component, OnDestroy, OnInit } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'war-adventure-loaders-lava-lamp',
  imports: [],
  templateUrl: './lava-lamp.html',
  styleUrl: './lava-lamp.scss',
})
export class LavaLamp implements OnInit, OnDestroy {
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
