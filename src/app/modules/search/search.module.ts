import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from "./search.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";


const routes = [
  {path: '', component: SearchComponent}
]

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule { }
