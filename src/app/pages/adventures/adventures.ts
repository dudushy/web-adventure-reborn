import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { ADVENTURES } from '../../consts';

@Component({
  selector: 'app-adventures',
  imports: [
    RouterLink
  ],
  templateUrl: './adventures.html',
  styleUrl: './adventures.scss',
})
export class Adventures implements OnInit, OnDestroy {
  readonly adventures = ADVENTURES;

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
