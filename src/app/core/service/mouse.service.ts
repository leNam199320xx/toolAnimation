import { Injectable } from '@angular/core';
import { Finger } from '../model/finger.model';
import { BehaviorSubject } from 'rxjs';
import { Point } from '../model/point.model';
import { Grid } from '../model/grid.model';

@Injectable()
export class MouseService {
    currentFinger: Finger;
    defaultFinger: Finger;
    tempFinger: Finger;
    enabled = false;
    enabledGrid = false;
    started = false;
    isTemp = false;
    startPoint = new Point();
    height: number;
    width: number;
    svg: SVGSVGElement;
    grid = new Grid();
    onStart: BehaviorSubject<boolean> = new BehaviorSubject(null);
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
        this.createDefaultFinger();
        this.svg.appendChild(this.currentFinger.holdElement.element);
        this.grid.svg = this.svg;
        this.openGrid();
    }

    private createDefaultFinger() {
        this.defaultFinger = new Finger();
        this.defaultFinger.enabled = true;
        this.defaultFinger.hiddenAfterMove = true;
        this.defaultFinger.updatePosition(0, 0);
        this.defaultFinger.mapFingerAndElement();
        this.defaultFinger.updateLayout();
        this.currentFinger = this.defaultFinger;
    }

    private mouseStart(_event: MouseEvent) {
        _event.preventDefault();
        if (this.enabled) {
            this.started = true;
            if (this.isTemp) {
                this.currentFinger = this.tempFinger;
            } else {
                this.currentFinger = this.defaultFinger;
            }
            if (this.currentFinger && this.currentFinger.enabled) {
                this.currentFinger.touched = true;
                this.currentFinger.holdElement.show();
            }
            this.startPoint.x = _event.offsetX;
            this.startPoint.y = _event.offsetY;
            this.setPositionForFinger(_event.offsetX, _event.offsetY);
            // this.onStart.next(true);
            this.svg.classList.add('block-events');
        }
    }

    private mouseMove(_event: MouseEvent) {
        _event.preventDefault();
        if (this.started) {
            this.setPositionForFinger(_event.offsetX, _event.offsetY);
            // this.onMove.next(true);
        }
    }

    private mouseEnd(_event: MouseEvent) {
        _event.preventDefault();
        if (this.started) {
            this.setPositionForFinger(_event.offsetX, _event.offsetY);
            this.finishNow();
            this.onEnd.next(true);
        }
        this.svg.classList.remove('block-events');
    }

    openGrid() {
        this.enabledGrid = !this.enabledGrid;
        if (this.enabledGrid) {
            this.grid.calculate(100, this.height, this.width);
        }
    }

    finishNow() {
        this.started = false;
        this.isTemp = false;
        if (this.currentFinger) {
            this.currentFinger.touched = false;
            if (this.currentFinger.hiddenAfterMove) {
                this.currentFinger.holdElement.hide();
            }
        }
        this.onEnd.next(true);
    }
    /**
     * start mouse event
     */
    start() {
        this.enabled = true;
        if (!this.currentFinger) {
            this.currentFinger = this.defaultFinger;
        }
    }
    /**
     * Stop now
     */
    stop() {
        this.enabled = false;
        this.started = false;
        this.currentFinger.enabled = false;
        this.currentFinger.touched = false;
        this.defaultFinger.enabled = false;
        this.defaultFinger.touched = false;
    }

    /**
     * set value form position of a element
     * @param _x position from left
     * @param _y position from top
     */
    setPositionForFinger(_x = 0, _y = 0) {
        if (this.currentFinger && this.enabled && this.started
            && this.currentFinger.touched && this.currentFinger.enabled) {
            const disX = _x - this.startPoint.x;
            const disY = _y - this.startPoint.y;
            if (this.isTemp) {
                this.currentFinger.updatePosition(this.currentFinger.point.x + disX, this.currentFinger.point.y + disY);
            } else {
                this.currentFinger.updatePosition(_x, _y);
            }
            this.currentFinger.mapFingerAndElement();
            this.startPoint.x = _x;
            this.startPoint.y = _y;
        }
    }

    /**
     * display a element follows mouse
     * if this object enabled and element enabled and finger touched to this element
     */
    showFinger() {
        if (this.enabled && this.started
            && this.currentFinger.touched && this.currentFinger.enabled) {
            this.currentFinger.updateLayout();
            // this.onMove.next(true);
        }
    }

    setFingerToDrag(_fin: Finger) {
        this.tempFinger = _fin;
        this.tempFinger.enabled = true;
        this.tempFinger.holdElement.show();
        this.isTemp = true;
    }
}
