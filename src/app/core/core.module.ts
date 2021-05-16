import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageService} from "./storage/storage.service";
import {SQLite} from "@ionic-native/sqlite/ngx";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [StorageService, SQLite]
})
export class CoreModule {
}
