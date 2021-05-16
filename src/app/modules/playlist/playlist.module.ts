import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {PlaylistsComponent} from "./screens/playlists/playlists.component";
import {PlaylistComponent} from "./screens/playlist/playlist.component";
import {PlaylistCreateModalComponent} from "./components/playlist-create-modal/playlist-create-modal.component";
import {PlaylistUpdateModalComponent} from "./components/playlist-update-modal/playlist-update-modal.component";


const routes = [
  {path: '', component: PlaylistsComponent},
  {path: ':id', component: PlaylistComponent}
]

@NgModule({
  declarations: [PlaylistsComponent, PlaylistComponent, PlaylistCreateModalComponent, PlaylistUpdateModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PlaylistModule {
}
