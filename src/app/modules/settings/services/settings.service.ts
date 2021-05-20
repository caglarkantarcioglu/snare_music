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

  constructor(private storage: StorageService) {
  }

  async Init() {
    await this.getCategories();
  }

  async getCategories() {
    const _categories = await this.storage.$categories();
    this.categories.next(_categories)
  }

  async updateCategory(index, event: any) {
    await this.storage.ChangeCategoryEnable(index, event.detail.checked);
    await this.getCategories();
  }

}
