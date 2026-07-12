import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'war-adventure-interactive-hover-buttons',
  imports: [TranslateModule],
  templateUrl: './hover-buttons.html',
  styleUrl: './hover-buttons.scss',
})
export class HoverButtons implements OnInit, OnDestroy {
  private debugService = inject(DebugService);

  hoverOpacity = 0;
  hoverWidth = '0px';
  hoverHeight = '0px';
  hoverLeft = '0px';

  constructor() {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  getData(event: MouseEvent | FocusEvent): void {
    this.debugService.log(this, 'event', event);

    const target = event.currentTarget;
    if (!(target instanceof HTMLButtonElement)) {
      throw new TypeError('Hover event current target must be an HTMLButtonElement.');
    }

    this.debugService.log(this, 'target', target);

    const rect = target.getBoundingClientRect();
    this.debugService.log(this, 'rect', rect);

    const wrapper = target.parentElement;
    if (!(wrapper instanceof HTMLElement)) {
      throw new TypeError('Hover button parent must be an HTMLElement.');
    }

    const wrapperRect = wrapper.getBoundingClientRect();
    this.debugService.log(this, 'wrapperRect', wrapperRect);

    this.hoverOpacity = 1;
    this.hoverWidth = `${rect.width}px`;
    this.hoverHeight = `${rect.height}px`;
    this.hoverLeft = `${rect.left - wrapperRect.left}px`;
  }
}
