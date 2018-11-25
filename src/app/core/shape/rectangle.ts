import { AttributeSvg } from './attribute';

export class Rectangle extends AttributeSvg {
    x = 0;
    y = 0;
    height = 40;
    width = 40;
    stroke = '';
    strokeWidth = 0;
    backgroundColor = '';
    scale = 1;
    constructor() {
        super();
        this.Create();
    }

    Create() {
        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.updateLayout();
    }

    updateLayout() {
        this.setTransform();
        this.element.setAttribute('height', '' + this.height);
        this.element.setAttribute('width', '' + this.width);
        this.element.setAttribute('stroke', '' + this.stroke);
        this.element.setAttribute('stroke-width', '' + this.strokeWidth);
        this.element.setAttribute('fill', '' + this.backgroundColor);
        this.element.setAttribute('transform', '' + this.transformString);
        this.element.setAttribute('opacity', '' + this.opacity);
        this.element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '' + this.src);
    }
}
