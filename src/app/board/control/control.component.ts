import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { MouseService } from 'src/app/core/service/mouse.service';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

    constructor(public controlService: ControlService, private mouseService: MouseService) { }

    ngOnInit() {
        this.controlService.onChangeFrame.subscribe(res => {
            if (res) {
                this.mouseService.displayPoint();
            }
        });

        this.controlService.onFinishTimer.subscribe(res => {
            if (res) {
                this.mouseService.enabled = false;
                this.mouseService.finishNow();
            }
        });
    }

    btnNext() {
        this.controlService.nextFrame();
    }

    btnBack() {
        this.controlService.backFrame();
    }

    btnPlay() {
        this.controlService.start();
        this.mouseService.enabled = this.controlService.isRunning;
    }

    btnStop() {
        this.controlService.stop();
        this.mouseService.enabled = this.controlService.isRunning;
    }
}
