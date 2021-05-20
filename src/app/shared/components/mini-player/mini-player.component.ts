import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayerService} from "../../../modules/player/services/player.service";
import {TrackService} from "../../services/track.service";

@Component({
  selector: 'app-mini-player',
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.scss'],
})
export class MiniPlayerComponent{

  miniPlayerType = localStorage.getItem('MiniPlayerType')

  constructor(public player: PlayerService, public trackService: TrackService) {
  }

  async openPlayer() {
    $('.mini-player').addClass('close-player')
    setTimeout(() => {
      this.trackService.miniPlayer = false
    }, 500)
  }

  async closeMiniPlayer() {
    $('.mini-player').addClass('close-player')
    setTimeout(() => {
      this.trackService.miniPlayer = false
      this.player.pause();
    }, 500)
  }

}
