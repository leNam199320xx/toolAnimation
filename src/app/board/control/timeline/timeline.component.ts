import { Component, OnInit, Input } from '@angular/core';
import { Frame } from 'src/app/core/model/frame.model';
import { ControlService } from 'src/app/core/service/control.service';
import { ShapeService } from 'src/app/core/service/shape.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
    @Input() isKeyFrame = false;
    constructor(public controlService: ControlService, private shapeService: ShapeService) { }

    ngOnInit() {
    }

    btnKey(_event: MouseEvent, _frame: Frame) {
        if (!this.isKeyFrame) {
            if (_event.which === 2) {
                _event.preventDefault();
            }
            if (this.controlService.isRunning) {
                this.controlService.setKeyWhenRunning(_frame.index);
            } else {
                this.controlService.setKey(_frame.index);
            }
        }
        // console.log(_event, _frame);
    }

    loadKey(_frame: Frame) {
        const anim = this.shapeService.animationShapes.find(a => a.startFrame <= _frame.index + 1 && a.endFrame >= _frame.index + 1);
        if (anim) {
            const val = anim.listPoints.find(f => f.framePosition === _frame.index + 1);
            return val !== null && val !== undefined;
        }
        return false;
    }

    mouseRight(_event: MouseEvent) {
        // console.log(1);
        _event.preventDefault();
    }
}
