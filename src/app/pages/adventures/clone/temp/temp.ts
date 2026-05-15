import { Component, OnDestroy, OnInit } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'app-adventure-clone-temp',
  imports: [],
  templateUrl: './temp.html',
  styleUrl: './temp.scss',
})
export class Temp implements OnInit, OnDestroy {
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
