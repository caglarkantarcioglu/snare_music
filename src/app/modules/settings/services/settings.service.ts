import {Injectable} from '@angular/core';
import {YoutubeApiService} from '../../../shared/services/youtube-api.service';
import {BehaviorSubject} from 'rxjs';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {TrackService} from '../../../shared/services/track.service';
import {StorageService} from "../../../core/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  categories = []
  backgrounds = []

  constructor(private storage: StorageService) {
  }

  async Init() {
    await this.getCategories();
    await this.getBackgrounds();
  }

  async getCategories() {
    const _categories = await this.storage.$categories();
    this.categories = _categories
  }

  async getBackgrounds() {
    const _backgrounds = await this.storage.$backgrounds();
    this.backgrounds = _backgrounds
  }

  async updateCategory(index, event: any) {
    await this.storage.ChangeCategoryEnable(index, event.detail.checked);
    await this.getCategories();
  }

  async updateBackground(id) {
    this.backgrounds = []
    await this.storage.ChangeBackground(id)
    setTimeout(() => {
      this.getBackgrounds();
    },500)
  }

  async changeMiniPlayerType(type, event: any) {
    if (event.detail.checked === true) {
      await this.storage.ChangeMiniPlayerType(type)
    }
  }

}
