import { Img } from './img';
import { Rectangle } from './rectangle';
import { Circle } from './circle';
import { Finger } from '../model/finger.model';
import { BehaviorSubject } from 'rxjs';
import { ShapeMode } from '../enum/shapeMode';
import { RectCorner } from '../enum/RectCorner';
import { FingerType } from '../enum/FingerType';

export class ShapeControls {
    shape: Img | Rectangle | Circle;
    controls: Finger[] = [];
    shapeControl: Finger;
    onSelectFinger: BehaviorSubject<Finger> = new BehaviorSubject(null);
    mode: ShapeMode;
    minSize = [10, 10];
    selectedFinger: Finger;
    private createOneCircle() {
        const _fin = new Finger();
        const _cir = new Circle();
        _cir.opacity = 0.5;
        _cir.backgroundColor = 'blue';
        _cir.stroke = 'red';
        _cir.strokeWidth = 2;
        _cir.r = 10;
        _cir.hide();
        _fin.holdElement = _cir;
        _fin.type = FingerType.control;
        return _fin;
    }

    private createControl() {
        this.shapeControl = new Finger();
        this.shapeControl.holdElement = this.shape;
        this.shapeControl.point.x = this.shape.x;
        this.shapeControl.point.y = this.shape.y;
    }

    createControlsForRect() {
        const _fin1 = this.createOneCircle();
        const _fin2 = this.createOneCircle();
        const _fin3 = this.createOneCircle();
        const _fin4 = this.createOneCircle();
        this.controls = [_fin1, _fin2, _fin3, _fin4];
        this.updateLayoutForRect();
        this.createControl();
        this.addEvents();
        return this.controls;
    }

    createControlsForCircle() {
        const _fin1 = this.createOneCircle();
        this.controls = [_fin1];
        this.updateLayoutForCircle();
        this.createControl();
        this.addEvents();
        return this.controls;
    }

    updateLayout() {
        if (this.mode === ShapeMode.Rect) {
            this.updateLayoutForRect();
        } else if (this.mode === ShapeMode.Circle) {
            this.updateLayoutForCircle();
        }
    }

    updateLayoutForCircle() {
        this.controls[0].updatePosition(this.shape.x, this.shape.y);
        this.controls[0].updateLayout();
    }

    updateSize(_width = 10, _height = 10) {
        this.shape.width = _width < this.minSize[0] ? this.minSize[0] : _width;
        this.shape.height = _height < this.minSize[1] ? this.minSize[1] : _height;
    }

    updatePosition(_x: number, _y: number) {
        this.shape.x = _x || 0;
        this.shape.y = _y || 0;
        this.shapeControl.point.x = this.shape.x;
        this.shapeControl.point.y = this.shape.y;
    }

    updateLayoutForRect(_inx: number = null) {
        this.controls[0].updatePosition(this.shape.x - this.shape.width / 2, this.shape.y - this.shape.height / 2);
        this.controls[0].updateLayout();
        this.controls[1].updatePosition(this.shape.x + this.shape.width / 2, this.shape.y - this.shape.height / 2);
        this.controls[1].updateLayout();
        this.controls[2].updatePosition(this.shape.x + this.shape.width / 2, this.shape.y + this.shape.height / 2);
        this.controls[2].updateLayout();
        this.controls[3].updatePosition(this.shape.x - this.shape.width / 2, this.shape.y + this.shape.height / 2);
        this.controls[3].updateLayout();
        this.shape.updateLayout();
    }

    private clickToControl($target) {
        this.onSelectFinger.next($target);
        this.selectedFinger = $target;
    }

    private addEvents() {
        let _ind = 0;
        const rectCorners: RectCorner[] = [RectCorner.top_left, RectCorner.top_right, RectCorner.bottom_right, RectCorner.bottom_left];
        this.controls.forEach(_fin => {
            _fin.index = rectCorners[_ind];
            _fin.holdElement.name = 'c_' + rectCorners[_ind];
            _fin.holdElement.element.onmousedown = () => {
                this.clickToControl(_fin);
            };
            _ind++;
        });
        this.shapeControl.type = FingerType.shape;
        this.shapeControl.holdElement.element.onmousedown = () => {
            this.onSelectFinger.next(this.shapeControl);
        };
    }
}
