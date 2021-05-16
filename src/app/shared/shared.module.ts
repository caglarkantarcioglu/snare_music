import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MiniPlayerComponent} from "./components/mini-player/mini-player.component";
import {PreloaderComponent} from "./components/preloader/preloader.component";


@NgModule({
  declarations: [MiniPlayerComponent, PreloaderComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MiniPlayerComponent,
    PreloaderComponent
  ]
})
export class SharedModule {
}
