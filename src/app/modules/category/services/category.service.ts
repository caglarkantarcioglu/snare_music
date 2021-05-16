import {Injectable} from '@angular/core';
import {YoutubeApiService} from "../../../shared/services/youtube-api.service";
import {BehaviorSubject} from "rxjs";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {TrackService} from "../../../shared/services/track.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  CATEGORY_ID_LIST = [
    'RDCLAK5uy_l8kJfTElp2zFMop7IboOXetbbKU3a9VeQ',
    'RDCLAK5uy_l63FFr2xGnXGVPfOWTNtAirWzsmZW_fBU',
    'RDCLAK5uy_k31GPZp_nSsHeJEniR4MqtqFBRJatI-JI',
    'RDCLAK5uy_n7OdwqgA4C6ewA6dD-YAXJEqUC0lPHqUA',
    'RDCLAK5uy_kH6Y9fB6BTPzXdPX27zK79_t42tT_ya8c',
    'RDCLAK5uy_miLVOuCHnbtfW7swwNA8o-LjeiaDXy3x8'
  ]

  constructor(private ytApi: YoutubeApiService, private trackService: TrackService) {
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
    await this.CATEGORY_ID_LIST.forEach(async id => {
      const category = await this.getCategory(id);
      categories.push(category)
    })
    return categories;

  }

  async Init() {
    const categories = await this.getCategories();
    await this.categories.next(categories)
  }
}
