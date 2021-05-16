import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {DefaultComponent} from "./default.component";
import {DefaultRoutingModule} from "./default-routing.module";


@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    SharedModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule {
}
