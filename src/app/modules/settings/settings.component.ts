import { Component, OnInit } from '@angular/core';
import {SettingsService} from './services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {}

  async ionViewWillEnter() {
  await this.settingsService.getCategories();
  }
}
