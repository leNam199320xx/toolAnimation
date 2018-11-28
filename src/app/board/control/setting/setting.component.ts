import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { ShapeService } from 'src/app/core/service/shape.service';
import { MouseService } from 'src/app/core/service/mouse.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  constructor(public controlService: ControlService, public shapeService: ShapeService, public mouseService: MouseService) { }

  btnLoad() {
    this.controlService.settingVideo();
  }

  change(_event: KeyboardEvent) {
    if (_event && _event.keyCode === 13) {
      this.mouseService.grid.calculate();
    }

    this.controlService.settingVideo();
  }
}
