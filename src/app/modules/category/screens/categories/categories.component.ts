import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: any[];
  subscription: Subscription

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private categoryService: CategoryService) {
  }

  async ionViewWillEnter() {
    this.subscription = this.categoryService.categories.subscribe(categories => {
      this.categories = categories
    })
  }

  async ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  async refresh(event: any) {
    this.categories = [];
    await setTimeout(async () => {
      await this.categoryService.Init();
      await event.target.complete();
    }, 1000)

  }

  async play(songs, index) {
    await this.categoryService.setPlayingItems(songs, index)
  }


}
