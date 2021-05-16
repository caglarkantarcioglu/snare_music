import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {YoutubeApiService} from "../../../shared/services/youtube-api.service";
import {MusicService} from "../../music/services/music.service";
import {PlaylistService} from "../../playlist/services/playlist.service";
import {TrackService} from "../../../shared/services/track.service";

@Injectable({
  providedIn: 'root'
})
export class YtSearchService {

  searchResults: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(
    private ytApiService: YoutubeApiService,
    private musicService: MusicService,
    private playlistService: PlaylistService,
    private trackService: TrackService
  ) {
  }

  async setPlaySearchedItem(item) {
    await this.trackService.setPlayingTracks([{
      id: item.id.videoId,
      link: item.snippet.link,
      channelTitle: item.snippet.channelTitle,
      title: item.snippet.title,
      imageUrl: item.snippet.thumbnails.high.url
    }], 0);
  }

  async getSearchResults(searchKey): Promise<any> {
    const items = await this.ytApiService.search(searchKey);
    await this.searchResults.next(items)
  }

  async addMusic(item) {
    await this.musicService.add(item);
  }

  async addPlaylistItem(item) {
    await this.playlistService.addItem(item)
  }

}
