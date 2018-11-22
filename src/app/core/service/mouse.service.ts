import { Injectable } from '@angular/core';
import { Finger } from '../model/finger.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MouseService {
    currentPoint: Finger;
    defaultPoint: Finger;
    tempPoint: Finger;
    enabled = false;
    started = false;
    isTemp = false;
    svg: SVGSVGElement;
    onMove: BehaviorSubject<boolean> = new BehaviorSubject(null);
    onEnd: BehaviorSubject<boolean> = new BehaviorSubject(null);
    /**
     * if user want start mouse event then must call setup first and only once
     * @param _svg svg element
     */
    setup(_svg: SVGSVGElement) {
        this.svg = _svg;
        this.svg.onmousedown = this.mouseStart.bind(this);
        this.svg.onmousemove = this.mouseMove.bind(this);
        this.svg.onmouseup = this.mouseEnd.bind(this);
        this.defaultPoint = new Finger();
        this.defaultPoint.enabled = true;
        this.defaultPoint.hiddenAfterMove = true;
        this.currentPoint = this.defaultPoint;
        this.svg.appendChild(this.currentPoint.holdElement.svgElement);
    }

    mouseStart(_event: MouseEvent) {
        if (this.enabled) {
            this.started = true;
            if (this.isTemp) {
                this.currentPoint = this.tempPoint;
            } else {
                this.currentPoint = this.defaultPoint;
            }
            if (this.currentPoint && this.currentPoint.enabled) {
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
        this.isTemp = false;
        if (this.currentPoint) {
            this.currentPoint.touched = false;
            if (this.currentPoint.hiddenAfterMove) {
                this.currentPoint.holdElement.hide();
            }
        }
        this.onEnd.next(true);
    }
    /**
     * start mouse event
     */
    start() {
        this.enabled = true;
        if (!this.currentPoint) {
            this.currentPoint = this.defaultPoint;
        }
    }

    stop() {
        this.enabled = false;
        this.currentPoint = this.defaultPoint;
        this.defaultPoint.enabled = false;
        this.defaultPoint.touched = false;
    }

    /**
     * set value form position of a element
     * @param _x position from left
     * @param _y position from top
     */
    setPoint(_x = 0, _y = 0) {
        if (this.currentPoint) {
            this.currentPoint.point.x = _x;
            this.currentPoint.point.y = _y;
            this.currentPoint.mapPointAndElement();
        }
    }

    /**
     * display a element follows mouse
     * if this object enabled and element enabled and finger touched to this element
     */
    displayPoint() {
        if (this.enabled && this.currentPoint.touched) {
            this.currentPoint.holdElement.updateAttributes();
            this.onMove.next(true);
        }
    }

    setPointToDrag(_fin: Finger) {
        this.tempPoint = _fin;
        this.tempPoint.enabled = true;
        this.isTemp = true;
    }
}
