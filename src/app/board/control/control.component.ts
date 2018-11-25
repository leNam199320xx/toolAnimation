import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { MouseService } from 'src/app/core/service/mouse.service';
import { ControlContinueService } from 'src/app/core/service/controlContinue.service';
import { ShapeService } from 'src/app/core/service/shape.service';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
    isEditMode = false;
    constructor(
        public controlService: ControlService,
        private mouseService: MouseService,
        private shapeService: ShapeService,
        private controlDevService: ControlContinueService
    ) {
        // control service for game
        // control dev service for developer
    }

    ngOnInit() {
        this.mouseService.onEnd.subscribe(res => {
            if (res) {
                this.shapeService.selectedShape = null;
            }
        });
        // swhen game timer stop
        this.controlService.onEnd.subscribe(res => {
            if (res) {
                this.stop();
            }
        });

        // update mouse in game when move real mouse
        this.controlService.onChangeFrame.subscribe(res => {
            if (res) {
                this.mouseService.showFinger();
            }
        });

        this.controlDevService.onChangeFrame.subscribe(res => {
            if (res) {
                this.mouseService.showFinger();
                if (this.shapeService.selectedShape) {
                    this.shapeService.updateShape();
                }
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
    }

    btnStop() {
        this.stop();
    }

    btnEdit() {
        if (!this.isEditMode) {
            this.stop();
            this.controlDevService.start();
            this.mouseService.start();
        } else {
            this.controlDevService.stop();
        }
        this.isEditMode = !this.isEditMode;
    }

    stop() {
        this.mouseService.enabled = false;
        this.controlService.stop();
        this.mouseService.finishNow();
        this.controlService.stop();
        this.controlDevService.start();
    }
}
