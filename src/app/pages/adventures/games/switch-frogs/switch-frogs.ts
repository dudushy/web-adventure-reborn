import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';

const INITIAL_BOARD: (0 | 1 | 2)[] = [1, 1, 1, 0, 2, 2, 2];
const INITIAL_FROG_POSITIONS: number[] = [0, 1, 2, 4, 5, 6];
const FROG_TRANSITION_MS = 500;

@Component({
  selector: 'app-adventure-games-switch-frogs',
  imports: [TranslateModule],
  templateUrl: './switch-frogs.html',
  styleUrl: './switch-frogs.scss',
})
export class SwitchFrogs implements OnInit, OnDestroy {
  board: (0 | 1 | 2)[] = [...INITIAL_BOARD];
  frogPositions: number[] = [...INITIAL_FROG_POSITIONS];
  isWon: boolean = false;
  jumpingFrogIndex: number | null = null;

  constructor(
    private debugService: DebugService,
    private cdr: ChangeDetectorRef,
  ) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
  }

  reset(): void {
    this.debugService.log(this);
    this.board = [...INITIAL_BOARD];
    this.frogPositions = [...INITIAL_FROG_POSITIONS];
    this.isWon = false;
    this.jumpingFrogIndex = null;
  }

  processPlayOnLilyPad(lilyPadNumber: number): void {
    this.debugService.log(this, 'lilyPadNumber', lilyPadNumber);

    if (this.isWon) return;

    const pos = lilyPadNumber - 1;
    const group = this.board[pos];

    if (group === 0) return;

    const direction = group === 1 ? 1 : -1;
    const step1 = pos + direction;
    const step2 = pos + direction * 2;

    let destination = -1;

    if (step1 >= 0 && step1 <= 6 && this.board[step1] === 0) {
      destination = step1;
    } else if (step1 >= 0 && step1 <= 6 && this.board[step1] !== 0 && step2 >= 0 && step2 <= 6 && this.board[step2] === 0) {
      destination = step2;
    }

    if (destination === -1) return;

    this.board[destination] = group;
    this.board[pos] = 0;

    const frogIndex = this.frogPositions.indexOf(pos);
    if (frogIndex !== -1) {
      this.frogPositions = this.frogPositions.map((p, i) => (i === frogIndex ? destination : p));
      this.jumpingFrogIndex = frogIndex;
      setTimeout(() => {
        this.jumpingFrogIndex = null;
        this.cdr.markForCheck();
      }, FROG_TRANSITION_MS);
    }

    this.checkWin();
  }

  private checkWin(): void {
    const leftSide = this.board.slice(0, 3).every((v) => v === 2);
    const rightSide = this.board.slice(4, 7).every((v) => v === 1);
    this.isWon = leftSide && rightSide;
    if (this.isWon) this.debugService.log(this, 'WIN!');
  }
}
