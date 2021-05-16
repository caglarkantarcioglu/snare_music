import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicsComponent} from './screens/musics/musics.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from "@angular/router";

const routes = [
  {path: '', component: MusicsComponent},
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MusicsComponent]
})
export class MusicModule {
}
