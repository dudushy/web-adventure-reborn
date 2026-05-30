import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';
import { FrogAreaType, FrogStateType } from '@web-adventure-reborn/types';

@Component({
  selector: 'app-adventure-random-frog',
  imports: [TranslateModule],
  templateUrl: './frog.html',
  styleUrl: './frog.scss',
})
export class Frog implements OnInit, OnDestroy {
  private flyInterval: ReturnType<typeof setInterval> | null = null;
  private currentRotationDeg: number = 0;

  frogState: FrogStateType = 'idle';
  readonly tongueAnimationDuration: number = 1200;
  readonly flyCatchPauseDuration: number = 800;

  frogTongue: boolean = false;
  frogRotation: string = '0deg';
  frogTransitionDuration: string = '0.6s';
  frogArea: FrogAreaType = {
    x_axis: {
      min: 29,
      max: 70,
    },
    y_axis: {
      min: 30,
      max: 66,
    },
  };

  flyVerticalPosition: string = '0%';
  flyHorizontalPosition: string = '0%';
  flyTransitionDuration: string = '0.5s';
  flyArea: FrogAreaType = {
    x_axis: {
      min: 5,
      max: 95,
    },
    y_axis: {
      min: 5,
      max: 95,
    },
  };

  private flyX: number = 10;
  private flyY: number = 10;
  private flyVx: number = 0;
  private flyVy: number = 0;
  readonly flyMaxSpeed: number = 2;
  readonly flySteerStrength: number = 0.6;
  readonly flyWallRepulsionDistance: number = 15;
  readonly flyFrogRepulsionDistance: number = 8;

  flyCatchVerticalPosition: string = '15%';
  flyCatchHorizontalPosition: string = '50%';

  debugVerticalPosition: string = '50%';
  debugHorizontalPosition: string = '50%';

  get frogTransitionDurationInMs(): number {
    return parseFloat(this.frogTransitionDuration) * 1000;
  }

  get flyTransitionDurationInMs(): number {
    return parseFloat(this.flyTransitionDuration) * 1000;
  }

  constructor(
    private debugService: DebugService,
    private cdr: ChangeDetectorRef,
  ) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);

    this.flyX = this.flyArea.x_axis.min + Math.random() * (this.flyArea.x_axis.max - this.flyArea.x_axis.min);
    this.flyY = this.flyArea.y_axis.min + Math.random() * (this.flyArea.y_axis.max - this.flyArea.y_axis.min);
    this.clampFlyToCircle();
    this.flyVx = (Math.random() - 0.5) * this.flyMaxSpeed;
    this.flyVy = (Math.random() - 0.5) * this.flyMaxSpeed;
    this.flyHorizontalPosition = `${this.flyX}%`;
    this.flyVerticalPosition = `${this.flyY}%`;

    this.flyInterval = setInterval(() => {
      this.stepFly();
    }, 100);

    this.debugService.log(this, 'this.flyInterval', this.flyInterval);
  }

  ngOnDestroy(): void {
    this.debugService.log(this);

    if (this.flyInterval) {
      clearInterval(this.flyInterval);
      this.flyInterval = null;
    }
  }

  catchFly(): void {
    this.debugService.log(this, 'frogState', this.frogState);

    if (this.frogState === 'idle') {
      this.frogState = 'catching';
      this.debugService.log(this, 'iniciando sequência de captura');
    } else if (this.frogState === 'finished') {
      this.frogState = 'idle';
      this.frogTongue = false;
      this.currentRotationDeg = 0;
      this.frogRotation = '0deg';
      this.flyX = this.flyArea.x_axis.min + Math.random() * (this.flyArea.x_axis.max - this.flyArea.x_axis.min);
      this.flyY = this.flyArea.y_axis.min + Math.random() * (this.flyArea.y_axis.max - this.flyArea.y_axis.min);
      this.clampFlyToCircle();
      this.flyVx = (Math.random() - 0.5) * this.flyMaxSpeed;
      this.flyVy = (Math.random() - 0.5) * this.flyMaxSpeed;
      this.flyHorizontalPosition = `${this.flyX}%`;
      this.flyVerticalPosition = `${this.flyY}%`;
      this.flyInterval = setInterval(() => this.stepFly(), 100);
      this.debugService.log(this, 'reiniciando');
      this.cdr.detectChanges();
    }
  }

  stepFly(): void {
    if (this.frogState === 'catching') {
      this.guideFlyToCatch();
      return;
    }

    if (this.frogState !== 'idle') return;

    // Steering aleatório — muda a direção gradualmente
    this.flyVx += (Math.random() - 0.5) * this.flySteerStrength;
    this.flyVy += (Math.random() - 0.5) * this.flySteerStrength;

    // Repulsão proporcional das bordas da flyArea
    const distLeft = this.flyX - this.flyArea.x_axis.min;
    const distRight = this.flyArea.x_axis.max - this.flyX;
    const distTop = this.flyY - this.flyArea.y_axis.min;
    const distBottom = this.flyArea.y_axis.max - this.flyY;

    if (distLeft < this.flyWallRepulsionDistance) this.flyVx += (1 - distLeft / this.flyWallRepulsionDistance) * 0.8;
    if (distRight < this.flyWallRepulsionDistance) this.flyVx -= (1 - distRight / this.flyWallRepulsionDistance) * 0.8;
    if (distTop < this.flyWallRepulsionDistance) this.flyVy += (1 - distTop / this.flyWallRepulsionDistance) * 0.8;
    if (distBottom < this.flyWallRepulsionDistance) this.flyVy -= (1 - distBottom / this.flyWallRepulsionDistance) * 0.8;

    // Repulsão da área do sapo
    const frogCenterX = (this.frogArea.x_axis.min + this.frogArea.x_axis.max) / 2;
    const frogCenterY = (this.frogArea.y_axis.min + this.frogArea.y_axis.max) / 2;
    const nearFrogX = this.flyX > this.frogArea.x_axis.min - this.flyFrogRepulsionDistance && this.flyX < this.frogArea.x_axis.max + this.flyFrogRepulsionDistance;
    const nearFrogY = this.flyY > this.frogArea.y_axis.min - this.flyFrogRepulsionDistance && this.flyY < this.frogArea.y_axis.max + this.flyFrogRepulsionDistance;

    if (nearFrogX && nearFrogY) {
      this.flyVx += this.flyX < frogCenterX ? -1.2 : 1.2;
      this.flyVy += this.flyY < frogCenterY ? -1.2 : 1.2;
    }

    // Clampar velocidade ao máximo
    const speed = Math.sqrt(this.flyVx * this.flyVx + this.flyVy * this.flyVy);
    if (speed > this.flyMaxSpeed) {
      this.flyVx = (this.flyVx / speed) * this.flyMaxSpeed;
      this.flyVy = (this.flyVy / speed) * this.flyMaxSpeed;
    }

    // Aplicar velocidade
    this.flyX += this.flyVx;
    this.flyY += this.flyVy;

    // Safety clamp dentro da flyArea
    this.flyX = Math.max(this.flyArea.x_axis.min, Math.min(this.flyArea.x_axis.max, this.flyX));
    this.flyY = Math.max(this.flyArea.y_axis.min, Math.min(this.flyArea.y_axis.max, this.flyY));
    this.clampFlyToCircle();

    this.flyHorizontalPosition = `${this.flyX}%`;
    this.flyVerticalPosition = `${this.flyY}%`;

    this.debugService.log(this, 'fly pos', `x=${this.flyX.toFixed(1)} y=${this.flyY.toFixed(1)} vx=${this.flyVx.toFixed(2)} vy=${this.flyVy.toFixed(2)}`);

    this.rotateFrogTowardFly(this.flyX, this.flyY);
    this.cdr.detectChanges();
  }

  rotateFrogTowardFly(flyX: number, flyY: number): void {
    this.debugService.log(this, 'flyX', flyX);
    this.debugService.log(this, 'flyY', flyY);

    const dx = flyX - 50;
    const dy = flyY - 50;
    const angleRad = Math.atan2(dx, -dy);
    const targetDeg = angleRad * (180 / Math.PI);

    const normalizedCurrent = ((this.currentRotationDeg % 360) + 360) % 360;
    let diff = targetDeg - normalizedCurrent;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    this.currentRotationDeg += diff;

    this.frogRotation = `${this.currentRotationDeg}deg`;
    this.debugService.log(this, 'this.frogRotation', this.frogRotation);
  }

  private guideFlyToCatch(): void {
    const targetX = parseFloat(this.flyCatchHorizontalPosition);
    const targetY = parseFloat(this.flyCatchVerticalPosition);

    const dx = targetX - this.flyX;
    const dy = targetY - this.flyY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 1.5) {
      this.onFlyArrived(targetX, targetY);
      return;
    }

    const targetSpeed = Math.min(this.flyMaxSpeed, dist * 0.15);
    this.flyVx += ((dx / dist) * targetSpeed - this.flyVx) * 0.3;
    this.flyVy += ((dy / dist) * targetSpeed - this.flyVy) * 0.3;

    this.flyX += this.flyVx;
    this.flyY += this.flyVy;

    this.flyHorizontalPosition = `${this.flyX}%`;
    this.flyVerticalPosition = `${this.flyY}%`;

    this.debugService.log(this, 'guiding fly', `x=${this.flyX.toFixed(1)} y=${this.flyY.toFixed(1)} dist=${dist.toFixed(1)}`);

    this.rotateFrogTowardFly(this.flyX, this.flyY);
    this.cdr.detectChanges();
  }

  private onFlyArrived(targetX: number, targetY: number): void {
    if (this.flyInterval) {
      clearInterval(this.flyInterval);
      this.flyInterval = null;
    }

    this.flyX = targetX;
    this.flyY = targetY;
    this.flyVx = 0;
    this.flyVy = 0;
    this.flyHorizontalPosition = `${targetX}%`;
    this.flyVerticalPosition = `${targetY}%`;

    this.frogState = 'caught';
    this.rotateFrogTowardFly(targetX, targetY);
    this.cdr.detectChanges();

    this.debugService.log(this, 'mosca capturada em', `x=${targetX} y=${targetY}`);

    setTimeout(() => {
      this.frogTongue = true;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.frogState = 'finished';
        this.cdr.detectChanges();
      }, this.tongueAnimationDuration);
    }, this.flyTransitionDurationInMs + this.flyCatchPauseDuration);
  }

  private clampFlyToCircle(): void {
    const centerX = 50;
    const centerY = 50;
    const maxRadius = 44;

    const dx = this.flyX - centerX;
    const dy = this.flyY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > maxRadius) {
      this.flyX = centerX + (dx / dist) * maxRadius;
      this.flyY = centerY + (dy / dist) * maxRadius;
      const dotProduct = this.flyVx * (dx / dist) + this.flyVy * (dy / dist);
      if (dotProduct > 0) {
        this.flyVx -= dotProduct * (dx / dist);
        this.flyVy -= dotProduct * (dy / dist);
      }
    }
  }
}
