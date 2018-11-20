import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  constructor(public controlService: ControlService) { }

  ngOnInit() {
  }
  btnLoad() {
    this.controlService.settingVideo();
  }
}
