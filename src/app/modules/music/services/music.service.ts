import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../../../core/storage/storage.service";
import {TrackService} from "../../../shared/services/track.service";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  tracks: BehaviorSubject<any[]> = new BehaviorSubject([])

  constructor(private storage: StorageService, private trackService: TrackService, private toast: ToastController) {
  }

  async Init() {
    await this.get();
  }

  async setPlayingItems(tracks, index) {
    await this.trackService.setPlayingTracks(tracks, index)
  }

  async get() {
    const tracks = await this.storage.$musics();
    await this.tracks.next(tracks)
  }

  async reorder(items) {
    await this.storage.ReorderingMusics(items);
    await this.get();
  }

  async add(item) {
    await this.storage.AddMusic(item);
    const toast = await this.toast.create({
      message: item.snippet.title + ' Tüm Müziklere Eklendi !',
      position: 'bottom',
      color: 'danger',
      duration: 1000
    })
    await toast.present();
    await this.get();
  }

  async delete(id) {
    await this.storage.DeleteMusic(id)
    await this.get();
  }

}
