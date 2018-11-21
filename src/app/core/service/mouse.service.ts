import { Injectable } from '@angular/core';
import { Finger } from '../model/finger.model';

@Injectable()
export class MouseService {
    points: Finger[] = [];
    currentPoint: Finger;
    enabled = false;
    started = false;
    svg: SVGSVGElement;
    setup(_svg: SVGSVGElement) {
        this.svg = _svg;
        this.svg.onmousedown = this.mouseStart.bind(this);
        this.svg.onmousemove = this.mouseMove.bind(this);
        this.svg.onmouseup = this.mouseEnd.bind(this);
        this.points.forEach(_p => {
            _p.holdElement.hide();
        });

        this.currentPoint = new Finger();
        this.points.push(this.currentPoint);
        this.svg.appendChild(this.currentPoint.holdElement.svgElement);
    }

    mouseStart(_event: MouseEvent) {
        if (this.enabled) {
            this.started = true;
            if (this.currentPoint) {
                this.currentPoint.touched = true;
                this.currentPoint.holdElement.show();
            }
            this.setPoint(_event.offsetX, _event.offsetY);
        }
    }

    mouseMove(_event: MouseEvent) {
        if (this.started) {
            this.setPoint(_event.offsetX, _event.offsetY);
        }
    }

    mouseEnd(_event: MouseEvent) {
        if (this.started) {
            this.setPoint(_event.offsetX, _event.offsetY);
        }
        this.finishNow();
    }

    finishNow() {
        this.started = false;
        if (this.currentPoint) {
            this.currentPoint.touched = false;
            this.currentPoint.holdElement.hide();
        }
    }

    setPoint(_x = 0, _y = 0) {
        if (this.currentPoint) {
            this.currentPoint.point.x = _x;
            this.currentPoint.point.y = _y;
            this.currentPoint.mapPointAndElement();
        }
    }

    displayPoint() {
        if (this.enabled && this.currentPoint.touched) {
            this.currentPoint.holdElement.updateAttributes();
        }
    }
}
