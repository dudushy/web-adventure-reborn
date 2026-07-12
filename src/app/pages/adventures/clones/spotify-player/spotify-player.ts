import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'war-adventure-clones-spotify-player',
  imports: [TranslateModule],
  templateUrl: './spotify-player.html',
  styleUrl: './spotify-player.scss',
})
export class SpotifyPlayer implements OnInit, OnDestroy {
  private debugService = inject(DebugService);

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
