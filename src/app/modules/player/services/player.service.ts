import {Injectable, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {TrackService} from "../../../shared/services/track.service";
import YouTubePlayer from 'youtube-player'
import {IonRange} from "@ionic/angular";
import {MusicControls} from "@ionic-native/music-controls/ngx";
import {BackgroundMode} from '@ionic-native/background-mode/ngx';


@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  player = YouTubePlayer('video-player');
  playingTracks: any[] = [null]
  backgroundSubscription: Subscription;
  isBackground = false;
  subscription: Subscription;
  index = 0;
  isPlay = false;
  loop = false;
  shuffle = false;
  time;

  sliderValue = 0;
  sliderEnd = 0;

  duration: any;
  currentTime: any;

  constructor(
    private trackService: TrackService,
    private musicControl: MusicControls,
    private background: BackgroundMode
  ) {
    this.subscription = this.trackService.playingOptions.subscribe(data => {
      if (data.tracks) {
        this.playingTracks = data.tracks;
        this.index = data.index;
        if (document.getElementById('video-player')) {
          this.play();
        }
      }
    })
  }

  async InitOnPlay() {
    const time = await this.player.getCurrentTime();
    if (this.isPlay && time) {
      this.sliderValue = await +time.toString().split('.')[0]
      await this.resume();
    }
  }

  // Player Controls
  async play(): Promise<any> {
    const selectedTrack = await this.playingTracks[this.index]
    await this.player.loadVideoById(selectedTrack.id);
    await this.playBackground();
    await clearInterval(this.time)
    await this.changeTime({detail: {value: 0}})
    await this.timer();
    this.isPlay = true;
  }

  async pause() {
    //Pause Playing Track
    if (this.isBackground) {
      this.musicControl.updateIsPlaying(false);
      this.musicControl.updateDismissable(true)
    }

    this.isPlay = false;
    await this.player.pauseVideo()
  }

  async resume() {
    if (this.isBackground) {
      this.musicControl.updateIsPlaying(true);
      this.musicControl.updateDismissable(false)
    }

    //Resume Stoped Track
    this.isPlay = true;
    await this.player.playVideo()
  }

  async previous() {
    this.sliderValue = 0
    this.sliderEnd = 0;

    if (this.index === 0) {
      this.index = this.playingTracks.length;
    }

    if (this.index > 0) {
      this.isPlay = false;
      this.index -= 1
      await this.play();
    }
  }

  async next() {
    this.sliderEnd = 0;
    this.sliderValue = 0

    if (this.shuffle) {
      this.index = await this.randomIndex();
    }

    if (this.loop) {
      this.index -= 1;
    }

    if (this.index === this.playingTracks.length - 1) {
      this.index = -1
    }

    if (this.playingTracks.length > 0) {
      this.isPlay = false;
      this.index += 1
      await this.player.stopVideo();
      await this.play();
    }
  }

  // Time Controls
  async changeTime(event) {
    if (this.sliderValue - 1 <= event.detail.value && event.detail.value <= this.sliderValue + 1) {
      return;
    } else {
      await this.pause();
      this.sliderValue = event.detail.value
      this.player.seekTo(event.detail.value)
      await this.resume();
    }

  }

  private async timer() {
    this.time = await setInterval(async () => {
      if (this.isPlay) {
        if (this.sliderEnd === 0) {
          const duration = await this.player.getDuration();
          this.sliderEnd = await +duration.toString().split('.')[0];
        }
        const playerState = await this.player.getPlayerState();
        if (playerState === 2) {
          await this.player.playVideo();
        }
        const currentTime = await this.player.getCurrentTime();
        this.sliderValue += 1 / 100
        if (this.sliderValue >= this.sliderEnd - 0.1 && this.sliderValue !== 0 && this.sliderEnd !== 0) {
          await this.next();
        }
      }
    }, 10)
  }

  private async randomIndex(): Promise<number> {
    const index = Math.floor(Math.random() * this.playingTracks.length)
    return index
  }

  // Background Player Settings
  private async playBackground() {
    await this.background.enable();

    if (this.isBackground) {
      await this.backgroundSubscription.unsubscribe();
      await this.destroyBackground();
    }

    const song = await this.playingTracks[this.index]
    await this.musicControl.create({
      track: song.title,
      artist: '',
      cover: song.imageUrl,
      isPlaying: true,
      dismissable: true,

      hasPrev: true,
      hasNext: true,
      hasClose: true,

      ticker: 'Now playing "Time is Running Out"',
      // All icons default to their built-in android equivalents
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    });
    await this.backgroundListener();
    this.isBackground = true;
  }

  private async destroyBackground() {
    await this.musicControl.destroy();
  }

  private async backgroundListener() {
    this.backgroundSubscription = await this.musicControl.subscribe().subscribe((action: any) => {
      const message = JSON.parse(action).message
      if (message === 'music-controls-play') {
        this.background.enable();
        this.resume()
      }
      if (message === 'music-controls-pause') {
        this.pause();
      }
      if (message === 'music-controls-previous') {
        this.previous()
      }
      if (message === 'music-controls-next') {
        this.next();
      }
      if (message === 'music-controls-destroy') {
        this.pause();
      }
    })
    await this.musicControl.listen(); // activates the observable above
  }
}
