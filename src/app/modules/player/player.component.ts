import {Component} from '@angular/core';
import {PlayerService} from "./services/player.service";
import {TrackService} from "../../shared/services/track.service";
import {Location} from "@angular/common";
import {BackgroundMode} from "@ionic-native/background-mode/ngx";

@Component({
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.scss']
})
export class PlayerComponent {

  constructor(
    public player: PlayerService,
    public location: Location,
    private trackService: TrackService,
  ) {
  }

  async ionViewWillEnter() {
    await this.setBackgroundImage();
    await this.player.InitOnPlay();
    this.trackService.miniPlayer = false;
  }

  async ionViewDidLeave() {
    setTimeout(() => {
      this.trackService.miniPlayer = true;
    }, 500)
  }

  async setBackgroundImage() {
    const images: any[] = await JSON.parse(localStorage.getItem('Backgrounds'))
    const image = await images.find(i => i.enable === true);
    await $('#bg').css("backgroundImage", "url('" + image.url + "')")
  }

  setLoop() {
    this.player.loop = !this.player.loop;
    this.player.shuffle = false;
  }

  setShuffle() {
    this.player.shuffle = !this.player.shuffle;
    this.player.loop = false;
  }

  previous() {
    this.player.loop = false;
    this.player.previous();
  }

  next() {
    this.player.loop = false;
    this.player.next();
  }
}
