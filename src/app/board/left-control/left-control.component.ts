import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { ShapeService } from 'src/app/core/service/shape.service';
import { ControlLeftMode } from 'src/app/core/enum/ControlLeftMode';

@Component({
  selector: 'app-left-control',
  templateUrl: './left-control.component.html',
  styleUrls: ['./left-control.component.css']
})
export class LeftControlComponent implements OnInit {

  constructor(public controlService: ControlService,
    public shapeService: ShapeService) { }

  ngOnInit() {
  }
  btnMove() {
    this.shapeService.controlLeftMode = ControlLeftMode.move;
  }

  btnResize() {
    this.shapeService.controlLeftMode = ControlLeftMode.resize;
  }
}
