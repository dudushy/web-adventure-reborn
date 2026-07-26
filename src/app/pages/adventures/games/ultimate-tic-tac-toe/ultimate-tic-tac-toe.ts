import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'war-adventure-games-ultimate-tic-tac-toe',
  imports: [TranslateModule],
  templateUrl: './ultimate-tic-tac-toe.html',
  styleUrl: './ultimate-tic-tac-toe.scss',
})
export class UltimateTicTacToe implements OnInit, OnDestroy {
  private debugService = inject(DebugService);
  private cdr = inject(ChangeDetectorRef);

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
