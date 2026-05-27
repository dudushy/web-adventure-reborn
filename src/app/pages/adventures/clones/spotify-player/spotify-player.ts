import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DebugService } from '@shyland-dev/utils';

@Component({
  selector: 'app-adventure-clones-spotify-player',
  imports: [TranslateModule],
  templateUrl: './spotify-player.html',
  styleUrl: './spotify-player.scss',
})
export class SpotifyPlayer implements OnInit, OnDestroy {
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
