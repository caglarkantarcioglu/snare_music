import {Component} from '@angular/core';
import {StorageService} from "./core/storage/storage.service";
import {TrackService} from "./shared/services/track.service";
import {CategoryService} from "./modules/category/services/category.service";
import {MusicService} from "./modules/music/services/music.service";
import {PlaylistService} from "./modules/playlist/services/playlist.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading = true;

  constructor(
    private storage: StorageService,
    private trackService: TrackService,
    private categoryService: CategoryService,
    private musicService: MusicService,
    private playlistService: PlaylistService,
  ) {
    this.Init();
  }

  async Init() {
    await this.storage.DatabaseInitialize();
    await this.categoryService.Init();
    await this.playlistService.Init();
    await this.musicService.Init();
    setTimeout(() => {
      this.loading = false
    }, 6000)
  }
}
