import { AttributeSvg } from './attribute';

export class Circle extends AttributeSvg {
    x = 0;
    y = 0;
    scale = 1;
    r = 10;
    constructor() {
        super();
        this.Create();
    }

    Create() {
        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.updateLayout();
    }

    updateLayout() {
        this.height = undefined;
        this.width = undefined;
        this.setTransform();
        this.element.setAttribute('rx', '' + this.x);
        this.element.setAttribute('ry', '' + this.y);
        this.element.setAttribute('r', '' + (this.r || this.d / 2));
        this.element.setAttribute('stroke', '' + this.stroke);
        this.element.setAttribute('stroke-width', '' + this.strokeWidth);
        this.element.setAttribute('fill', '' + this.backgroundColor);
        this.element.setAttribute('transform', this.transformString);
        this.element.setAttribute('opacity', '' + this.opacity);
    }
}
