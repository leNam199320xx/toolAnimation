import { Circle } from '../shape/circle';
import { Img } from '../shape/img';
import { Rectangle } from '../shape/rectangle';
import { FingerType } from '../enum/FingerType';

export class Finger {
    index: number;
    point: Circle;
    holdElement: Rectangle | Circle | Img;
    touched: boolean;
    enabled: boolean;
    hiddenAfterMove: boolean;
    distanceX: number;
    distanceY: number;
    type: FingerType;
    constructor() {
        this.createDefaultElement();
    }
    createDefaultElement() {
        this.holdElement = new Circle();
        this.point = new Circle();
        this.index = 0;
        this.touched = false;
        this.holdElement.hide();
    }
    mapFingerAndElement() {
        this.distanceX = this.point.x - this.holdElement.x;
        this.distanceY = this.point.y - this.holdElement.y;
        this.holdElement.updatePosition(this.point.x, this.point.y);
    }
    updateLayout() {
        this.mapFingerAndElement();
        this.holdElement.updateLayout();
    }
    updatePosition(_x: number = 0, _y: number = 0) {
        this.point.x = _x;
        this.point.y = _y;
    }
}
