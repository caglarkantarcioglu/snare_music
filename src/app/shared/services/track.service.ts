import {Injectable} from '@angular/core';
import {StorageService} from "../../core/storage/storage.service";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  miniPlayer = false;

  playingOptions: BehaviorSubject<any> = new BehaviorSubject({})

  constructor(private router: Router) {
  }

  async setPlayingTracks(tracks: any[], index: number) {
    await this.playingOptions.next({tracks: [...tracks], index})
    this.miniPlayer = false;
    await this.router.navigate(['player'])
  }
}
