import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'war-adventure-interactive-hover-buttons',
  imports: [TranslateModule],
  templateUrl: './hover-buttons.html',
  styleUrl: './hover-buttons.scss',
})
export class HoverButtons implements OnInit, OnDestroy {
  hoverOpacity: number = 0;
  hoverWidth: string = '0px';
  hoverHeight: string = '0px';
  hoverLeft: string = '0px';

  constructor(private debugService: DebugService) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  getData(event: MouseEvent): void {
    this.debugService.log(this, 'event', event);

    const target = event.target as HTMLElement;
    this.debugService.log(this, 'target', target);

    const rect = target.getBoundingClientRect();
    this.debugService.log(this, 'rect', rect);

    const wrapper = target.parentElement as HTMLElement;
    const wrapperRect = wrapper.getBoundingClientRect();
    this.debugService.log(this, 'wrapperRect', wrapperRect);

    this.hoverOpacity = 1;
    this.hoverWidth = `${rect.width}px`;
    this.hoverHeight = `${rect.height}px`;
    this.hoverLeft = `${rect.left - wrapperRect.left}px`;
  }
}
