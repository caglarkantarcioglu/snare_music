import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../../../core/storage/storage.service";
import {TrackService} from "../../../shared/services/track.service";
import {Router} from "@angular/router";
import {ActionSheetController, ModalController, ToastController} from "@ionic/angular";
import {Playlist} from "../../../shared/interfaces/playlist";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  createModal: any;
  updateModal: any;


  playlists: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  selectedPlaylist: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private storage: StorageService,
    private trackService: TrackService,
    private router: Router,
    private actionSheet: ActionSheetController,
    private toast: ToastController,
    private modalController: ModalController) {
  }

  async Init() {
    await this.get();
  }

  async get() {
    const playlists = await this.storage.$playlists();
    this.playlists.next(playlists)
  }

  async create(item: Playlist) {
    await this.storage.CreatePlaylist(item)
    await this.get();
  }

  async select(id) {
    const playlist = await this.storage.$playlist(id)
    await this.selectedPlaylist.next(playlist)
    await this.router.navigate(['playlist', id])
  }

  async setPlayerItems(tracks, index) {
    await this.trackService.setPlayingTracks(tracks, index);
  }

  // Add Item Options
  async openToast(title, name) {
    const toast = await this.toast.create({
      message: title + name + ' Listesine Eklendi !',
      position: 'bottom',
      color: 'danger',
      duration: 1000
    })
    await toast.present();
  }

  async addItem(item) {
    await this.get();
    const playlistData = this.playlists.getValue();
    const buttons = []
    await playlistData.forEach(p => {
      buttons.push({
        text: p.name, handler: async () => {
          await this.storage.AddMusicToPlaylist(p.id, item);
          await this.openToast(item.snippet.title, p.name)
          await this.get();
        }
      })
    });
    const actionSheet = await this.actionSheet.create({
      header: 'Parça Listeleri',
      cssClass: 'actionSheet',
      animated: true,
      buttons: [...buttons, {text: 'İptal', role: 'cancel'}]
    })
    await actionSheet.present();
  }

  // Create Modal Options
  async openCreateModal(modal) {
    this.createModal = await this.modalController.create({
      component: modal
    })
    return this.createModal.present();
  }

  async closeCreateModal() {
    return await this.createModal.dismiss();
  }

  //Update Modal Options
  async delete(id) {
    this.playlists.getValue().find(async (p, i) => {
      if (p.id === id) {
        await this.storage.DeletePlaylist(i);
        await this.get();
        await this.router.navigate(['playlist'])
      }
    })
  }

  async update(playlist) {
    await this.storage.UpdatePlaylist(playlist)
    await this.get();
  }

  async removeMusic(id, musicIndex) {
    await this.storage.DeleteMusicFromPlaylist(id, musicIndex)
  }

  async openUpdateModal(modal) {
    this.updateModal = await this.modalController.create({
      component: modal
    })
    return this.updateModal.present();
  }

  async closeUpdateModal() {
    return await this.updateModal.dismiss();
  }
}
