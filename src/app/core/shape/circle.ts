import { AttributeSvg } from './attribute';

export class Circle extends AttributeSvg {
    x = 0;
    y = 0;
    scale = 1;
    r = 10;
    constructor() {
        super();
        this.createSvg();
    }

    createSvg() {
        this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.updateAttributes();
    }

    updateAttributes() {
        this.height = undefined;
        this.width = undefined;
        this.setTransform();
        this.svgElement.setAttribute('rx', '' + this.x);
        this.svgElement.setAttribute('ry', '' + this.y);
        this.svgElement.setAttribute('r', '' + (this.r || this.d / 2));
        this.svgElement.setAttribute('stroke', '' + this.stroke);
        this.svgElement.setAttribute('stroke-width', '' + this.strokeWidth);
        this.svgElement.setAttribute('fill', '' + this.backgroundColor);
        this.svgElement.setAttribute('transform', this.transformString);
    }
}
