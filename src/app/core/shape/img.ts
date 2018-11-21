import { AttributeSvg } from './attribute';
import { NodeModel } from '../model/node.model';

export class Img extends AttributeSvg {
    x = 0;
    y = 0;
    height = 40;
    width = 40;
    src = 'assets/temp.jpg';
    transforms = [];
    scale = 1;
    constructor() {
        super();
        this.createSvg();
    }

    createSvg() {
        this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        this.updateAttributes();
    }

    updateAttributes() {
        this.setTransform();
        this.svgElement.setAttribute('height', '' + this.height);
        this.svgElement.setAttribute('width', '' + this.width);
        this.svgElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '' + this.src);
        this.svgElement.setAttribute('transform', this.transformString);
    }
}
