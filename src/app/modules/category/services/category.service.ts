import {Injectable} from '@angular/core';
import {YoutubeApiService} from "../../../shared/services/youtube-api.service";
import {BehaviorSubject} from "rxjs";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {TrackService} from "../../../shared/services/track.service";
import {StorageService} from "../../../core/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private ytApi: YoutubeApiService, private trackService: TrackService, private storage: StorageService) {
  }

  async setPlayingItems(songs, index) {
    await this.trackService.setPlayingTracks(songs, index)
  }

  async getCategory(id): Promise<any> {
    const pInfo = await this.ytApi.getCategoryInfo(id)
    const pItems = await this.ytApi.getCategoryItems(id)
    return await {...pInfo, songs: pItems}
  }

  async getCategories(): Promise<any[]> {
    const categories = [];
    const _categories = await this.storage.$categories();
    await _categories.filter(c => c.enable === true).forEach(async (item: any) => {
      const category = await this.getCategory(item.id);
      categories.push(category)
    })
    return categories;

  }

  async Init() {
    const categories = await this.getCategories();
    await this.categories.next(categories)
  }
}
