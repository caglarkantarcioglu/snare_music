import {Injectable} from '@angular/core';
import {INIT_MUSICS, INIT_PLAYLISTS} from "./init.data";
import {Observable} from "rxjs";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";
import {Platform} from "@ionic/angular";
import {Music} from "../../shared/interfaces/music";
import {Playlist} from "../../shared/interfaces/playlist";

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(private sql: SQLite, private platform: Platform) {
    /*
        this.platform.ready().then(async () => {
          this.sql.create({
            name: 'data.db',
            location: 'default'
          }).then(db => {
          })
        })
    */
  }

  async $musics(): Promise<Music[]> {
    return await JSON.parse(localStorage.getItem('Musics'))
  }

  async $playlists(): Promise<Playlist[]> {
    return await JSON.parse(localStorage.getItem('Playlists'))
  }

  async $playlist(id): Promise<Playlist> {
    return await this.$playlists().then(data => data.find(p => p.id === id))
  }

  async DatabaseInitialize() {
    if (!localStorage.getItem('Musics')) {
      localStorage.setItem('Musics', JSON.stringify([]))
    }
    if (!localStorage.getItem('Playlists')) {
      localStorage.setItem('Playlists', JSON.stringify([]))
    }
  }

  /* Musics */
  async AddMusic(item) {
    const musics = await this.$musics();
    musics.push({
      id: item.id.videoId,
      title: item.snippet.title,
      imageUrl: item.snippet.thumbnails.high.url
    });
    await localStorage.setItem('Musics', JSON.stringify(musics))
  }

  async DeleteMusic(id) {
    const musics = await this.$musics();
    return await musics.find((track, index) => {
      if (track.id === id) {
        musics.splice(index, 1)
        localStorage.setItem('Musics', JSON.stringify(musics))
      }
    })
  }

  async ReorderingMusics(items) {
    await localStorage.setItem('Musics', JSON.stringify(items))
  }


  /* Playlists */
  async CreatePlaylist(item: Playlist) {
    const playlists = await this.$playlists();
    await playlists.push(item);
    await localStorage.setItem('Playlists', JSON.stringify(playlists))
  }

  async AddMusicToPlaylist(id: number, item) {
    const playlists = await this.$playlists();
    await playlists.find(p => {
      if (p.id === id) {
        p.songs.push({
          id: item.id.videoId,
          title: item.snippet.title,
          imageUrl: item.snippet.thumbnails.high.url
        })
      }
    })
    await localStorage.setItem('Playlists', JSON.stringify(playlists))
  }

  async DeletePlaylist(index: number) {
    const playlists = await this.$playlists();
    await playlists.splice(index, 1);
    await localStorage.setItem('Playlists', JSON.stringify(playlists))
  }

  async DeleteMusicFromPlaylist(id: number, musicIndex: number) {
    const playlists = await this.$playlists();
    await playlists.find(p => {
      if (p.id === id) {
        p.songs.splice(musicIndex, 1)
      }
    })
    await localStorage.setItem('Playlists', JSON.stringify(playlists))
  }

  async UpdatePlaylist(playlist: Playlist) {
    const playlists = await this.$playlists();
    let index: number;
    await playlists.find((data: Playlist, i) => {
      if (data.id === playlist.id) {
        index = i
      }
    })
    playlists[index] = playlist
    await localStorage.setItem('Playlists', JSON.stringify(playlists))
  }

}
