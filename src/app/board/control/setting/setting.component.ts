import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  constructor(public controlService: ControlService) { }

  btnLoad() {
    this.controlService.settingVideo();
  }
}
