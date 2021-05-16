import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?&part=snippet&maxResults=20&q=';
  PLAYLIST_URL = 'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id='
  PLAYLIST_ITEMS_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId='
  KEY_URL = '&key=' + environment.API_KEY

  constructor(private http: HttpClient) {
  }

  async search(searchKey): Promise<any> {
    const res: any = await this.http.get(this.SEARCH_URL + searchKey + this.KEY_URL).toPromise();
    return await res.items.filter(r => r.id.kind === 'youtube#video')
  }

  async getCategoryItems(id) {
    const playlistItems: any = await this.http.get(this.PLAYLIST_ITEMS_URL + id + this.KEY_URL).toPromise()
    return await playlistItems.items.map((item) => {
      return {
        id: item.snippet.resourceId.videoId,
        channelTitle: item.snippet.channelTitle,
        title: item.snippet.title,
        imageUrl: item.snippet.thumbnails.high.url
      }
    })
  }

  async getCategoryInfo(id) {
    const playlistInfo: any = await this.http.get(this.PLAYLIST_URL + id + this.KEY_URL).toPromise()
    const playlist: any = {
      id: playlistInfo.items[0].id,
      name: playlistInfo.items[0].snippet.localized.title,
      imageUrl: playlistInfo.items[0].snippet.thumbnails.maxres.url
    }
    return playlist
  }
}
