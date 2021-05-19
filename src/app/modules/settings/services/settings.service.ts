import {Injectable} from '@angular/core';
import {YoutubeApiService} from '../../../shared/services/youtube-api.service';
import {BehaviorSubject} from 'rxjs';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {TrackService} from '../../../shared/services/track.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CATEGORY_ID_LIST = [
    'RDCLAK5uy_l8kJfTElp2zFMop7IboOXetbbKU3a9VeQ',
    'RDCLAK5uy_l63FFr2xGnXGVPfOWTNtAirWzsmZW_fBU',
    'RDCLAK5uy_k31GPZp_nSsHeJEniR4MqtqFBRJatI-JI',
    'RDCLAK5uy_n7OdwqgA4C6ewA6dD-YAXJEqUC0lPHqUA',
    'RDCLAK5uy_kH6Y9fB6BTPzXdPX27zK79_t42tT_ya8c',
    'RDCLAK5uy_miLVOuCHnbtfW7swwNA8o-LjeiaDXy3x8'
  ];

  constructor(private ytApi: YoutubeApiService, private trackService: TrackService) {
  }

  async getCategories() {
    const categories = [];
    await this.CATEGORY_ID_LIST.forEach(async id => {
      const category = await this.ytApi.getCategoryInfo(id);
      console.log(category);
      categories.push(category);
    });
    this.categories.next(categories);
  }

}
