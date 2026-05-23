import { Component, OnDestroy, OnInit } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'app-adventure-random-tongue',
  imports: [],
  templateUrl: './tongue.html',
  styleUrl: './tongue.scss',
})
export class Tongue implements OnInit, OnDestroy {
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
