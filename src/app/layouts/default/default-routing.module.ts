import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./default.component";
import {PlayerComponent} from "../../modules/player/player.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {path: '', redirectTo: 'categories'},
      {
        path: 'categories',
        loadChildren: () => import('../../modules/category/category.module').then(module => module.CategoryModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../modules/search/search.module').then(module => module.SearchModule)
      },
      {
        path: 'musics',
        loadChildren: () => import('../../modules/music/music.module').then(module => module.MusicModule)
      },
      {
        path: 'playlist',
        loadChildren: () => import('../../modules/playlist/playlist.module').then(module => module.PlaylistModule)
      },
    ]
  },
  {
    path: 'player',
    component: PlayerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DefaultRoutingModule {
}
