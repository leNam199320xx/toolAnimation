import { Circle } from '../shape/circle';

export class Grid {
    size: number;
    height: number;
    width: number;
    points: Circle[] = [];
    counts: number[] = [];
    count = 0;
    svg: SVGSVGElement;
    calculate(_size = this.size || 0,
        _height = this.height || 0,
        _width = this.width || 0) {
        this.height = _height;
        this.width = _width;
        this.size = _size;
        this.counts = [Math.ceil(_width / _size) + 1 || 0, Math.ceil(_height / _size) + 1 || 0];
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
