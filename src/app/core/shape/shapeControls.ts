import { Img } from './img';
import { Rectangle } from './rectangle';
import { Circle } from './circle';
import { Finger } from '../model/finger.model';
import { BehaviorSubject } from 'rxjs';

export class ShapeControls {
    shape: Img | Rectangle | Circle;
    controls: Finger[] = [];
    mainControl: Finger;
    selectedControl: Finger;
    onSelect: BehaviorSubject<Finger> = new BehaviorSubject(null);
    mode: number;
    createCircleControl() {
        const _fin = new Finger();
        const _cir = new Circle();
        _cir.opacity = 0.5;
        _cir.backgroundColor = 'blue';
        _cir.stroke = 'red';
        _cir.strokeWidth = 2;
        _cir.r = 10;
        _cir.show();
        _fin.holdElement = _cir;
        return _fin;
    }

    createMainControl() {
        this.mainControl = new Finger();
        this.mainControl.holdElement = this.shape;
    }

    createControlsForRect() {
        const _fin1 = this.createCircleControl();
        const _fin2 = this.createCircleControl();
        const _fin3 = this.createCircleControl();
        const _fin4 = this.createCircleControl();
        this.controls = [_fin1, _fin2, _fin3, _fin4];
        this.updateRectAttributes();
        this.createMainControl();
        this.addEvents();
        this.mode = 0;
        return this.controls;
    }

    createControlsForCircle() {
        const _fin1 = this.createCircleControl();
        this.controls = [_fin1];
        this.updateCircleAttributes();
        this.createMainControl();
        this.addEvents();
        this.mode = 1;
        return this.controls;
    }

    updateAttributes() {
        if (this.mode === 0) {
            this.updateRectAttributes();
        } else if (this.mode === 1) {
            this.updateCircleAttributes();
        }
    }

    updateCircleAttributes() {
        this.controls[0].holdElement.x = this.shape.x + this.shape.r;
        this.controls[0].holdElement.y = this.shape.y;
        this.controls[0].holdElement.updateAttributes();
    }

    updateRectAttributes() {
        this.controls[0].holdElement.x = this.shape.x - this.shape.width / 2;
        this.controls[0].holdElement.y = this.shape.y - this.shape.height / 2;
        this.controls[1].holdElement.x = this.shape.x + this.shape.width / 2;
        this.controls[1].holdElement.y = this.shape.y - this.shape.height / 2;
        this.controls[2].holdElement.x = this.shape.x + this.shape.width / 2;
        this.controls[2].holdElement.y = this.shape.y + this.shape.height / 2;
        this.controls[3].holdElement.x = this.shape.x - this.shape.width / 2;
        this.controls[3].holdElement.y = this.shape.y + this.shape.height / 2;
        this.controls[0].holdElement.updateAttributes();
        this.controls[1].holdElement.updateAttributes();
        this.controls[2].holdElement.updateAttributes();
        this.controls[3].holdElement.updateAttributes();
    }

    addEvents() {
        let _ind = 0;
        this.controls.forEach(_fin => {
            _ind++;
            _fin.holdElement.name = 'c_' + _ind;
            _fin.holdElement.svgElement.onmousedown = function () {
                this.clickToControl(_fin);
            }.bind(this);
        });
        this.mainControl.holdElement.svgElement.onmousedown = function () {
            this.onSelect.next(this.mainControl);
        }.bind(this);
    }

    clickToControl($target) {
        this.selectedControl = $target;
        this.onSelect.next($target);
    }

}
