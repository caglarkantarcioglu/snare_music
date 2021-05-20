import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-player-background-settings',
  templateUrl: './player-background-settings.component.html',
  styleUrls: ['./player-background-settings.component.scss'],
})
export class PlayerBackgroundSettingsComponent implements OnInit {

  constructor(public settingService: SettingsService) { }

  ngOnInit() {}

}
