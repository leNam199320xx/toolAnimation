import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { MouseService } from 'src/app/core/service/mouse.service';
import { ControlContinueService } from 'src/app/core/service/controlContinue.service';
import { ShapeService } from 'src/app/core/service/shape.service';
import { ButtonAttribute } from 'src/app/core/model/button.model';
import { AttributeSvg } from 'src/app/core/shape/attribute';
import { Video } from 'src/app/core/model/video.model';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
    attrBtnDevMode: ButtonAttribute = new ButtonAttribute();
    attrBtnKeyFrame: ButtonAttribute = new ButtonAttribute();
    currentFrame: number;
    duration: number;
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
                // this.shapeService.clearSelected();
            }
        });
        // swhen game timer stop
        this.controlService.onEnd.subscribe(res => {
            if (res) {
                this.controlService.stop();
            }
        });

        // update mouse in game when move real mouse
        this.controlService.onChangeFrame.subscribe(res => {
            if (res) {
                this.mouseService.showFinger();
                this.currentFrame = res;
            }
        });

        this.controlDevService.onChangeFrame.subscribe(res => {
            if (res) {
                this.mouseService.showFinger();
                this.shapeService.updateShape(-1, true);
            }
        });
    }

    btnKeyNow() {
        const vid = new Video();
        vid.tickTime = this.controlService.video.tickTime;
        const durationFrame = vid.calculateFrame(this.duration * 1000);
        if (this.shapeService.selectedShape) {
            this.setAnimation(this.currentFrame, durationFrame);
            // this.shapeService.updateShape(this.currentFrame);
        }
    }

    btnRemoveKey() {

    }

    private setAnimation(_startFrame, _endFrame) {
        if (this.attrBtnKeyFrame.isActive) {
            const _startPoint = this.shapeService.mapAnimationPointWithShape(this.shapeService.selectedShape.shape);
            const _endPoint = this.shapeService.mapAnimationPointWithShape(this.shapeService.selectedShape.shape);
            this.shapeService.calculateAnimation(_startPoint, _endPoint, _startFrame, _endFrame);
        }
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
        this.controlService.stop();
    }

    btnDevMode() {
        this.attrBtnDevMode.isActive = !this.attrBtnDevMode.isActive;
        if (!this.attrBtnDevMode.isActive) {
            this.controlDevService.stop();
            this.attrBtnKeyFrame.isActive = false;
            this.shapeService.clearSelected();
        } else {
            this.controlService.stop();
            this.controlDevService.start();
            console.log('start dev mode');
        }
    }
    btnKeyFrame() {
        this.attrBtnKeyFrame.isActive = !this.attrBtnKeyFrame.isActive;
    }
}
