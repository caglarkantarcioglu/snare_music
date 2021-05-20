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

  categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  backgrounds: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private storage: StorageService) {
  }

  async Init() {
    await this.getCategories();
    await this.getBackgrounds();
  }

  async getCategories() {
    const _categories = await this.storage.$categories();
    await this.categories.next(_categories)
  }

  async getBackgrounds() {
    const _backgrounds = await this.storage.$backgrounds();
    await this.backgrounds.next(_backgrounds)
  }

  async updateCategory(index, event: any) {
    await this.storage.ChangeCategoryEnable(index, event.detail.checked);
    await this.getCategories();
  }

  async updateBackground(id) {
    await this.storage.ChangeBackground(id);
    await this.getBackgrounds();
  }

  async changeMiniPlayerType(type, event: any) {
    if (event.detail.checked === true) {
      await this.storage.ChangeMiniPlayerType(type)
    }
  }

}
