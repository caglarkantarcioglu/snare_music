import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from "./settings.component";
import {MiniPlayerSettingsComponent} from "./components/mini-player-settings/mini-player-settings.component";
import {PlayerBackgroundSettingsComponent} from "./components/player-background-settings/player-background-settings.component";
import {CategoriesSettingsComponent} from "./components/categories-settings/categories-settings.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";

const routes = [
  {
    path: '', component: SettingsComponent
  }
]

@NgModule({
  declarations: [SettingsComponent, MiniPlayerSettingsComponent, PlayerBackgroundSettingsComponent, CategoriesSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule {
}
