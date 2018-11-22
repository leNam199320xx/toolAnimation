import { Circle } from '../shape/circle';
import { Img } from '../shape/img';
import { Rectangle } from '../shape/rectangle';

export class Finger {
    index: number;
    point: Circle;
    holdElement: Rectangle | Circle | Img;
    touched: boolean;
    enabled: boolean;
    hiddenAfterMove: boolean;
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
    mapPointAndElement() {
        this.holdElement.x = this.point.x;
        this.holdElement.y = this.point.y;
    }
}
