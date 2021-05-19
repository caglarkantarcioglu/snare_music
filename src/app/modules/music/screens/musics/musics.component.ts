import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrackService} from "../../../../shared/services/track.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ActionSheetController, IonReorderGroup} from "@ionic/angular";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {MusicService} from "../../services/music.service";
import {PlaylistService} from "../../../playlist/services/playlist.service";
import {Music} from "../../../../shared/interfaces/music";

class ItemReorderEventDetail {
}

@Component({
  selector: 'app-musics',
  templateUrl: 'musics.component.html',
  styleUrls: ['musics.component.scss']
})
export class MusicsComponent {
  items: Music[] = [];
  subscription: Subscription
  isReorder = false;
  searchKey = '';

  @ViewChild('reorder') reorderGroup: any;

  constructor(private musicService: MusicService) {
  }

  async searchHandler() {
    await this.musicService.search(this.searchKey)
  }

  async ionViewWillEnter() {
    this.subscription = this.musicService.tracks.subscribe(data => {
      this.items = data;
    })
  }

  async ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  reorderHandler() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
    this.isReorder = !this.isReorder;
  }

  async completeReorder() {
    await this.musicService.reorder(this.items);
    await this.reorderHandler();
  }

  async refresh(event: any) {
    this.items = [];
    setTimeout(() => {
      this.musicService.get();
      event.target.complete();
    }, 1000)

  }

  async play(index) {
    await this.musicService.setPlayingItems(this.items, index)
  }

  async deleteMusic(id) {
    await this.musicService.delete(id)
  }
}
