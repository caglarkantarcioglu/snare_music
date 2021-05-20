import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {IonInput, ToastController} from "@ionic/angular";
import {YtSearchService} from "./services/yt-search.service";
import {MusicService} from "../music/services/music.service";


@Component({
  selector: 'app-add',
  templateUrl: 'search.component.html',
  styleUrls: ['sarch.component.scss']
})
export class SearchComponent {
  searchKey: string;
  items: any[] = [];
  subscription: Subscription;
  @ViewChild('search') searchInput: IonInput;

  constructor(private searchService: YtSearchService) {
  }

  async ionViewWillEnter() {
    this.subscription = this.searchService.searchResults.subscribe(items => {
      this.items = items
    })
  }

  async ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  play(song) {
    this.searchService.setPlaySearchedItem(song)
  }

  addMusic(item) {
    this.searchService.addMusic(item);
  }

  addPlaylistMusic(item) {
    this.searchService.addPlaylistItem(item);
  }

  focusSearch() {
    this.searchInput.setFocus();
  }

  async listSearchResult() {
    if (!this.searchKey || this.searchKey === '') {
      return this.focusSearch();
    }
    await this.searchService.getSearchResults(this.searchKey)
  }

  async enterHandler(event) {
    if (event.key === 'Enter') {
      await this.listSearchResult();
    }
  }

}
