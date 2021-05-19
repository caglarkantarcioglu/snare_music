import {Component, OnInit, ViewChild} from '@angular/core';
import {Playlist} from "../../../../shared/interfaces/playlist";
import {PlaylistService} from "../../services/playlist.service";

@Component({
  selector: 'app-playlist-update-modal',
  templateUrl: './playlist-update-modal.component.html',
  styleUrls: ['./playlist-update-modal.component.scss'],
})
export class PlaylistUpdateModalComponent {
  playlist: Playlist;
  @ViewChild('playlistItemsReorder') reorderGroup: any;


  constructor(private playlistService: PlaylistService) {
  }

  async ionViewWillEnter() {
    this.playlist = await this.playlistService.selectedPlaylist.getValue();
  }

  async update() {
    await this.playlistService.update(this.playlist)
    await this.closeModal();
  }

  async closeModal() {
    await this.playlistService.select(this.playlist.id);
    this.playlistService.closeUpdateModal();
  }

  async deleteMusic(index) {
    await this.playlist.songs.splice(index, 1);
  }

  async delete() {
    await this.playlistService.delete(this.playlist.id);
    await this.closeModal();
  }
}
