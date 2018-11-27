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

    btnKey(_event: MouseEvent, _frame: Frame) {
        if (_event.which === 2) {
            _event.preventDefault();
        }
        if (this.controlService.isRunning) {
            this.controlService.setKeyWhenRunning(_frame.index);
        } else {
            this.controlService.setKey(_frame.index);
        }
        console.log(_event, _frame);
    }

    mouseRight(_event: MouseEvent) {
        console.log(1);
        _event.preventDefault();
    }
}
