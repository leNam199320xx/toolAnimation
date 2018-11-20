import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(public controlService: ControlService) { }

  ngOnInit() {
  }

  btnNext() {
    this.controlService.nextFrame();
  }

  btnBack() {
    this.controlService.backFrame();
  }

  btnPlay() {
    this.controlService.start();
  }

  btnStop() {
    this.controlService.stop();
  }
}
