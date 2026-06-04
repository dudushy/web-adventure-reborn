import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { BlobArrayType } from '@web-adventure-reborn';

@Component({
  selector: 'war-adventure-loaders-lava-lamp',
  imports: [],
  templateUrl: './lava-lamp.html',
  styleUrl: './lava-lamp.scss',
})
export class LavaLamp implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('blobEl') blobElements!: QueryList<ElementRef<HTMLDivElement>>;

  blobArray: BlobArrayType[] = [];
  minBlobAmount = 5;
  maxBlobAmount = 10;
  minBlobSize = 20;
  maxBlobSize = 200;
  minDuration = 10000;
  maxDuration = 20000;
  maxDelay = 1000;
  moveRange = 15; // max px deslocado por step (menor = mais suave)

  private animations: Animation[] = [];

  constructor(private debugService: DebugService) {
    this.debugService.log(this);
  }

  ngOnInit(): void {
    this.debugService.log(this);
    this.generateBlobs();
  }

  ngAfterViewInit(): void {
    this.blobElements.forEach((ref, index) => {
      const blob = this.blobArray[index];
      const anim = ref.nativeElement.animate(this.generateKeyframes(blob), {
        duration: blob.duration,
        delay: blob.delay,
        iterations: Infinity,
        easing: 'linear',
        fill: 'both',
      });
      this.animations.push(anim);
    });
  }

  ngOnDestroy(): void {
    this.debugService.log(this);
    this.animations.forEach((anim) => anim.cancel());
    this.animations = [];
  }

  generateBlobs(): void {
    const blobAmount = Math.floor(Math.random() * (this.maxBlobAmount - this.minBlobAmount + 1)) + this.minBlobAmount;

    for (let i = 0; i < blobAmount; i++) {
      const blob: BlobArrayType = {
        id: i,
        size: Math.floor(Math.random() * (this.maxBlobSize - this.minBlobSize + 1)) + this.minBlobSize,
        x: Math.floor(Math.random() * 80),
        y: Math.floor(Math.random() * 80),
        duration: Math.floor(Math.random() * (this.maxDuration - this.minDuration + 1)) + this.minDuration,
        delay: Math.floor(Math.random() * this.maxDelay),
      };
      this.blobArray.push(blob);
    }
  }

  private generateKeyframes(blob: BlobArrayType): Keyframe[] {
    const steps = Math.floor(Math.random() * 5) + 8; // 8–12 waypoints
    const maxTotal = this.moveRange * 4; // limite de deriva acumulada
    const keyframes: Keyframe[] = [];

    let tx = 0;
    let ty = 0;

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;

      if (i > 0) {
        // Random walk: pequeno passo a partir da posição anterior
        tx += Math.round((Math.random() * 2 - 1) * this.moveRange);
        ty += Math.round((Math.random() * 2 - 1) * this.moveRange);
        // Mantém deriva dentro do limite para não sair demais
        tx = Math.max(-maxTotal, Math.min(maxTotal, tx));
        ty = Math.max(-maxTotal, Math.min(maxTotal, ty));
      }

      // Organic blob shape: slightly vary border-radius per step
      const r1 = 40 + Math.round(Math.random() * 20);
      const r2 = 40 + Math.round(Math.random() * 20);
      const r3 = 40 + Math.round(Math.random() * 20);
      const r4 = 40 + Math.round(Math.random() * 20);

      keyframes.push({
        offset: progress,
        easing: 'ease-in-out',
        transform: `translateX(${tx}px) translateY(${ty}px)`,
        borderRadius: `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${100 - r4}% ${100 - r3}%`,
      });
    }

    // Close the loop so animation is seamless
    keyframes[keyframes.length - 1]['transform'] = keyframes[0]['transform'];
    keyframes[keyframes.length - 1]['borderRadius'] = keyframes[0]['borderRadius'];

    return keyframes;
  }
}
