import { Component, OnInit } from '@angular/core';
import { ControlService } from '../core/service/control.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(public controlService: ControlService) { }

  ngOnInit() {
    this.controlService.settingVideo();
  }

}
