import { Component, OnInit } from '@angular/core';
import { Frame } from 'src/app/core/model/frame.model';
import { ControlService } from 'src/app/core/service/control.service';
import { Timer } from 'src/app/core/model/timer.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(public controlService: ControlService) { }

  ngOnInit() {
  }

  btnKey(_frame: Frame) {
    this.controlService.setKey(_frame.index);
  }
}
