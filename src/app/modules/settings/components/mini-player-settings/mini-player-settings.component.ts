import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-mini-player-settings',
  templateUrl: './mini-player-settings.component.html',
  styleUrls: ['./mini-player-settings.component.scss'],
})
export class MiniPlayerSettingsComponent implements OnInit {
  miniPlayerType = localStorage.getItem('MiniPlayerType')

  constructor(public settingService: SettingsService) {
  }

  ngOnInit() {
  }

  async change(type, event) {
    await this.settingService.changeMiniPlayerType(type, event)
    this.miniPlayerType = await localStorage.getItem('MiniPlayerType')
  }

}
