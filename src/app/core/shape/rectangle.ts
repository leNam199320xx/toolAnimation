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
        this.createSvg();
    }

    createSvg() {
        this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.updateAttributes();
    }

    updateAttributes() {
        this.setTransform();
        this.svgElement.setAttribute('height', '' + this.height);
        this.svgElement.setAttribute('width', '' + this.width);
        this.svgElement.setAttribute('stroke', '' + this.stroke);
        this.svgElement.setAttribute('stroke-width', '' + this.strokeWidth);
        this.svgElement.setAttribute('fill', '' + this.backgroundColor);
        this.svgElement.setAttribute('transform', '' + this.transformString);
        this.svgElement.setAttribute('opacity', '' + this.opacity);
        this.svgElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '' + this.src);
    }
}
