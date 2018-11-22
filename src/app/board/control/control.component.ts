import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { MouseService } from 'src/app/core/service/mouse.service';
import { ControlContinueService } from 'src/app/core/service/controlContinue.service';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

    constructor(
        public controlService: ControlService,
        private mouseService: MouseService,
        private controlDevService: ControlContinueService
    ) { }

    ngOnInit() {
        this.controlService.onChangeFrame.subscribe(res => {
            if (res) {
                this.mouseService.displayPoint();
            }
        });

        this.controlService.onFinishTimer.subscribe(res => {
            if (res) {
                this.stop();
            }
        });

        this.controlService.onChangeFrame.subscribe(res => {
            if (res) {
                this.mouseService.displayPoint();
            }
        });

        this.controlDevService.start();

        this.controlDevService.onChange.subscribe(res => {
            if (res) {
                this.mouseService.displayPoint();
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
        this.controlDevService.stop();
        this.controlService.start();
        this.mouseService.enabled = true;
    }

    btnStop() {
        this.stop();
    }

    stop() {
        this.mouseService.enabled = false;
        this.controlService.stop();
        this.mouseService.finishNow();
        this.controlService.stop();
        this.controlDevService.start();
    }
}
