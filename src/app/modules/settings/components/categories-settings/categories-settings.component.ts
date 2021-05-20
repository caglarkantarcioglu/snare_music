import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-categories-settings',
  templateUrl: './categories-settings.component.html',
  styleUrls: ['./categories-settings.component.scss'],
})
export class CategoriesSettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService) {
  }

  ngOnInit() {}

}
