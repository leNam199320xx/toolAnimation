import { Circle } from '../shape/circle';

export class Grid {
    size = 10;
    height: number;
    width: number;
    points: Circle[] = [];
    counts: number[] = [];
    count = 0;
    svg: SVGSVGElement;
    minSize = 10;
    maxSize = 50;
    calculate() {
        this.size = this.size < this.minSize ? this.minSize
            : (this.size > this.maxSize ? this.maxSize : this.size);
        this.counts = [Math.ceil(this.width / this.size) + 1 || 0, Math.ceil(this.height / this.size) + 1 || 0];
        this.points.forEach(_cir => {
            _cir.remove();
        });
        this.points = [];
        for (let i = 0; i < this.counts[0]; i++) {
            for (let j = 0; j < this.counts[1]; j++) {
                this.count++;
                const _cir = new Circle();
                _cir.r = 2;
                _cir.strokeWidth = 0;
                _cir.opacity = 0.5;
                _cir.backgroundColor = 'blue';
                _cir.updatePosition(i * this.size, j * this.size);
                _cir.updateLayout();
                this.svg.appendChild(_cir.element);
                this.points.push(_cir);
            }
        }
    }
}
