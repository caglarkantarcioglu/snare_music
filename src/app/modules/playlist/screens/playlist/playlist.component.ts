import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Playlist} from "../../../../shared/interfaces/playlist";
import {Location} from "@angular/common";
import {PlaylistUpdateModalComponent} from "../../components/playlist-update-modal/playlist-update-modal.component";

@Component({
  selector: 'app-playlist-items',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
  playlist: Playlist;
  subscription: Subscription;

  constructor(private playlistService: PlaylistService, private router: Router) {
  }

  async ionViewWillEnter() {
    this.subscription = this.playlistService.selectedPlaylist.subscribe(data => {
      this.playlist = data
    })
  }

  async ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  async openPlayer(index) {
    await this.playlistService.setPlayerItems(this.playlist.songs, index);
  }

  async openUpdateModal() {
    await this.playlistService.openUpdateModal(PlaylistUpdateModalComponent)
  }
}
