import {Component} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {MusicService} from "../../../music/services/music.service";

@Component({
  selector: 'app-playlist-create-modal',
  templateUrl: './playlist-create-modal.component.html',
  styleUrls: ['./playlist-create-modal.component.scss'],
})
export class PlaylistCreateModalComponent {
  songs: any[];
  newPlaylist = {
    id: null,
    name: null,
    songs: []
  }

  constructor(private playlistService: PlaylistService) {
  }

  async ionViewWillEnter() {
    const playlists = await JSON.parse(localStorage.getItem('Playlists'))
    if (!playlists[0]) {
      this.newPlaylist.id = 0
    } else {
      this.newPlaylist.id = +this.playlistService.playlists.getValue()[0].id + 1
    }
    this.songs = JSON.parse(localStorage.getItem('Musics'))
  }

  async closeModal() {
    return await this.playlistService.closeCreateModal();
  }

  async pushSong(song: any, index) {
    await this.newPlaylist.songs.push(song);
    this.songs.splice(index, 1)
  }

  async create() {
    await this.playlistService.create(this.newPlaylist);
    await this.playlistService.closeCreateModal();
  }
}
