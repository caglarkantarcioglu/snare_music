import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrackService} from "../../../../shared/services/track.service";
import {PlaylistService} from "../../services/playlist.service";
import {PlaylistCreateModalComponent} from "../../components/playlist-create-modal/playlist-create-modal.component";
import {Playlist} from "../../../../shared/interfaces/playlist";

@Component({
  selector: 'app-playlist',
  templateUrl: 'playlists.component.html',
  styleUrls: ['playlists.component.scss']
})
export class PlaylistsComponent {
  items: Playlist[] = [];
  subscription: Subscription

  constructor(private playlistService: PlaylistService) {
  }

  async ionViewWillEnter() {
    this.subscription = this.playlistService.playlists.subscribe(data => {
      this.items = data;
    })
  }

  async ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  async openCreateModal() {
    await this.playlistService.openCreateModal(PlaylistCreateModalComponent);
  }

  openPlaylist(id) {
    this.playlistService.select(id)
  }

  refresh(event: any) {
    this.items = [];
    setTimeout(() => {
      this.playlistService.get();
      event.target.complete();
    }, 1000)
  }
}
