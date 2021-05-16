import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesComponent} from "./screens/categories/categories.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";

const routes = [
  {path: '', component: CategoriesComponent}
]


@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoryModule {
}
