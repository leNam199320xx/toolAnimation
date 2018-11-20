import { Content } from './content.model';
import { Point } from './point.model';

export class Box {
    x: number;
    y: number;
    height: number;
    width: number;
    points: Point[] = [];

    setPoints() {
        this.points = [];
        const _p1 = new Point();
        _p1.x = this.x;
        _p1.y = this.y;
        const _p2 = new Point();
        _p2.x = this.x + this.width;
        _p2.y = this.y;
        const _p3 = new Point();
        _p3.x = this.x + this.width;
        _p3.y = this.y + this.height;
        const _p4 = new Point();
        _p4.x = this.x;
        _p4.y = this.y + this.height;

        this.points.push(_p1, _p2, _p3, _p4);
    }
}
