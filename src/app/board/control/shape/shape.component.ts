import { Component, OnInit } from '@angular/core';
import { Rectangle } from 'src/app/core/shape/rectangle';
import { Circle } from 'src/app/core/shape/circle';
import { Img } from 'src/app/core/shape/img';
import { ControlService } from 'src/app/core/service/control.service';
import { ControlContinueService } from 'src/app/core/service/controlContinue.service';
import { ShapeService } from 'src/app/core/service/shape.service';
import { ShapeControls } from 'src/app/core/shape/shapeControls';

@Component({
    selector: 'app-shape',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.css']
})
export class ShapeComponent {

    shapeControls: ShapeControls;
    constructor(
        public controlService: ControlService,
        public controlDevService: ControlContinueService,
        public shapeService: ShapeService
    ) {
        this.shapeService.onSelectShape.subscribe(res => {
            if (res) {
                this.shapeControls = res;
            }
        });
    }

    change() {
        this.shapeControls.updateLayout();
    }
}
