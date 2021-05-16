import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {PlayerComponent} from "./player.component";
import { TimePipe } from './pipes/time.pipe';
import {MusicControls} from "@ionic-native/music-controls/ngx";
import {BackgroundMode} from "@ionic-native/background-mode/ngx";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [PlayerComponent, TimePipe],
  providers: [MusicControls, BackgroundMode]
})
export class PlayerModule {
}
