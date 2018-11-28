import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { ShapeService } from 'src/app/core/service/shape.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  constructor(public controlService: ControlService, public shapeService: ShapeService) { }

  btnLoad() {
    this.controlService.settingVideo();
  }

  change() {
    this.controlService.settingVideo();
  }
}
